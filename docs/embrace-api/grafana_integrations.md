---
title: Grafana Integration
description: Learn about the Embrace API to pull data 
sidebar_position: 1
---

# Metrics API Grafana Integration

## Prerequisites

- Grafana ≥ 2.5.0
- Embrace Metrics API Token. This can be found in the Settings page of the [Dashboard](https://dash.embrace.io/).

## Setting Up Embrace as a Data Source

Follow these steps to add Prometheus as a data source in the Grafana dashboard:
1. Click the gear icon to go to the Configurations page.
2. Click on "Add data source" and select Prometheus.
3. Name your source "embrace-metrics-api" and set the following fields:
    - `URL`: `https://api.embrace.io/metrics`
    - Under `Custom HTTP Headers`, add a header with a name `Authorization` and use `Bearer <YOUR_API_TOKEN>` as your token string. For example, if your API token is `e2d75f07a40843f0b8a53d1e3201edba`, your token string should be `Bearer e2d75f07a40843f0b8a53d1e3201edba`.

## Importing Dashboard JSON

We provide a JSON file that is pre-populated with common queries. To add the dashboard to Grafana, click on the Dashboards icon and select `+ Import`. Click on the Upload JSON file button. You may be asked to change the uid of the dashboard if some other dashboard already has that name. You can set it to something like `a-0000000`.

## Creating Time Series

Add a new panel and set the visualization to "Time series".

<img src={require('@site/static/images/embrace-api/timeseries_visualization.png').default} alt="Image showing Grafana timeseries visualization" />

Set the data source to "embrace-metrics-api:.  In the "Query options" section set the "Min interval". Currently only the following intervals are supported: 1m, 5m, 10m, 15m, 30m, 1hr, and 1d. **Keep in mind that Prometheus only supports 11,000 points per time series.**

<img src={require('@site/static/images/embrace-api/query_options.jpg').default} alt="Grafana timeseries visualization" />

The following PromQL query will provide a time series graph for total sessions for your app.

```promql
sessions_total{app_id="<app ID>"}
```

You'll notice that this gives you several time series, one for each combination of app version and OS version. We can 
make these more useful by grouping by app version. Each time series now shows the total sessions grouped by app version.

```promql
sum(sessions_total{app_id="<app ID>"}) by (app_version)
```

You can filter by an app version by specifying it in the expression

```promql
sessions_total{app_id="<app ID>", app_version="1.2.3"}
```

You can visualize multiple app versions in the same graph by creating multiple queries and filtering by each desired app version.

<img src={require('@site/static/images/embrace-api/two_timeseries_panel.png').default} alt="Multiple PromQL queries can be visualized on the same panel" />

## Creating Tables

Add a new panel and select the Table visualization. 

<img src={require('@site/static/images/embrace-api/table_visualization.png').default} alt="Image showing Grafana timeseries visualization" />

Add a query. For our example, we’ll see the session counts grouped by app version and OS version in descending order.

```promql
sum(sessions_total{app_id="<app ID>"}) by (app_version, os_version)
```

Select the Transform tab and add the Reduce transform. Set Mode to "Series to rows", Calculations to "Total", and turn "Labels to fields" on.

<img src={require('@site/static/images/embrace-api/transform_series_to_rows.png').default} alt="Image showing Grafana timeseries visualization" />

The table should now have the columns Field, app_version, os_version, and Total. Let’s get rid of that "Field" column. 

Add a new transformation, "Organize fields". You’ll see that each column can be renamed or hidden. Click the eye icon to hide the "Field" column.

<img src={require('@site/static/images/embrace-api/organize_fields.png').default} alt="Image showing Grafana timeseries visualization" />

Finally, you can sort the rows in descending order by clicking on the label for the Total order.

<img src={require('@site/static/images/embrace-api/table_panel_preview.png').default} alt="Image showing Grafana table visualization with data" caption="View session counts grouped by app version and OS version" />