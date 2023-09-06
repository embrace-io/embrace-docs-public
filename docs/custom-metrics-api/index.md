---
title: Introduction
description: Learn about the Embrace Custom Metrics API to manage custom metrics
sidebar_position: 0
---

# Embrace Custom Metrics API

The Embrace Custom Metrics API allows you to manage (create, get and delete) the custom metrics of your organization.
These will be available via the Metrics API and can also be forwarded to your
organization's [observability platform of choice](/data-destinations).

You can follow [this](/embrace-api/code_samples) guide to see how queries custom metrics.

## Prerequisites

- Embrace Custom Metrics API Token. You need to contact an Embrace onboarding specialist to get this token.

## Supported Metrics

The following metrics are supported to create using the API.

| Metric                 | Description                | Group By                                           | Filters                                                   | Time granularity       |
|------------------------|----------------------------|----------------------------------------------------|-----------------------------------------------------------|------------------------|
| sessions_total         | Number of sessions         | app_version, os_version, os_major_version, country, top_n_market_name | app_version, os_version, os_major_version, country, model | five_minute, hourly, daily |
| crashes_total          | Number of crashes          | app_version, os_version, os_major_version, country, top_n_market_name | app_version, os_version, os_major_version, country, model, tag_name, tag_value, msg | five_minute, hourly, daily |
| network_requests_total | Number of network requests | app_version, os_version, os_major_version, country | app_version, os_version, os_major_version, country, model, domain, path, method, status_code | five_minute, hourly, daily |
| anrs_total             | Number of ANR Samples      | app_version, os_version, os_major_version, country | app_version, os_version, os_major_version, country, model, method, sample_type | five_minute, hourly, daily |
| moments_total          | Number of Moments          | app_version, os_version, os_major_version, country, top_n_market_name | app_version, os_version, os_major_version, country, model, name | five_minute, hourly, daily |
| logs_total             | Number of Logs             | app_version, os_version, os_major_version, country | app_version, os_version, os_major_version, country, model, msg, type | five_minute, hourly, daily |
| spans_total            | Number of Spans            | app_version, os_version, os_major_version, country | app_version, os_version, os_major_version, country, model, name, outcome, span_attribute | five_minute, hourly, daily |

### Supported Parameters for Filters

| Filter           | Metrics                | Type   |  Operators                    | Example      |
|------------------|------------------------|--------|-------------------------------|--------------|
| app_version      | all                       | string   | eq, neq, in                   | `{"key": "app_version", "field_op": "eq", "val": "3.2.0"}` |
| os_version       | all                       | string   | eq, neq, in                   | `{"key": "os_version", "field_op": "eq", "val": "12.0"}` |
| os_major_version | all                       | int      | eq, neq, gt, gte, lt, lte, in | `{"key": "os_major_version", "field_op": "gt", "val": 9}` |
| country          | all                       | string   | eq, neq, in                   | `{"key": "country", "field_op": "eq", "val": "US"}` |
| model            | all                       | string   | eq, neq, like, nlike, in      | `{"key": "model", "field_op": "eq", "val": "model1"}` |
| has_anr          | sessions_total            | boolean  | eq                            | `{"key": "has_anr", "field_op": "eq", "val": true}` |
| tag_name         | crashes_total             | string   | eq, neq                       | `{"key": "tag_name", "field_op": "eq", "val": "crash_tag_name"}` |
| tag_value        | crashes_total             | string   | eq, neq                       | `{"key": "tag_value", "field_op": "eq", "val": "crash_tag_value"}` |
| msg              | crashes_total, logs_total | string   | like                          | `{"key": "msg", "field_op": "like", "val": "substring"}` |
| domain           | network_requests_total    | string   | eq, neq, like, nlike, in      | `{"key": "domain", "field_op": "like", "val": "example.com"}` |
| path             | network_requests_total    | string   | eq, like                      | `{"key": "path", "field_op": "like", "val": "foo/bar"}` |
| method           | network_requests_total    | string   | eq                            | `{"key": "method", "field_op": "eq", "val": "post"}` |
| status_code      | network_requests_total    | range    | eq                            | `{"key": "status_code", "field_op": "eq", "val": {"start": 400", "end": 499}}` |
| method           | anrs_total                | string   | eq, like, in                  | `{"key": "method", "field_op": "like", "val": "com.foo.method"}` |
| sample_type      | anrs_total                | string   | eq, neq, in                   | `{"key": "sample_type", "field_op": "eq", "val": "first"}` |
| name             | moments_total             | string   | eq, neq, like, nlike, in      | `{"key": "name", "field_op": "eq", "val": "moment1"}` |
| type             | logs_total                | string   | eq                            | `{"key": "type", "field_op": "eq", "val": "error"}` |
| name             | spans_total               | string   | eq, neq, like, nlike, in      | `{"key": "name", "field_op": "eq", "val": "span1"}` |
| outcome          | spans_total               | string   | eq                            | `{"key": "type", "field_op": "eq", "val": "successful"}` |
| span_attribute   | spans_total               | property | eq, neq                       | `{"key": "type", "field_op": "eq", "val": {"property_key": "k1", "property_values": ["v1", "v2"]}}` |


## API Endpoints

All the endpoints have the same authentication and authorization method, url and parameters.
- `URL`: `https://api.embrace.io/custom-metrics`

### Request

Headers:
- `Authorization`: we are going to use a Bearer token to authorize and authenticate our requests. 
i.e.: `Authorization: Bearer 7bd49186fed24af699cf93069fc64f03`.

URL Params:
- `app_id`: application id in which we are going to manage the custom metrics. i.e.: `appID1`
- `custom_metric_name`: custom metric name that we use to identify it. i.e.: `my_custom_metric_name`

Body Params:
- `name`: name you want to provide this new metric i.e.: `my_custom_metric_name`
- `metric`: base Embrace metric this new metric will be built from. i.e.: `sessions_total`.
- `group_by`: list of group by that we are going to use to group the metric. It can be empty.
  i.e.: `["os_version", "app_version"]`.
- `filters` list of filters that we are going to apply on the metric. It can be empty. i.e.:
```json
{
  "op": "and",
  "children": [
    {
      "field_op": "eq",
      "key": "os_version",
      "val": "12"
    }
  ]
}
```
- `time_granularity`: list of granularity that we are going to support on this metric. If it is empty, by default hourly
  is turned on. i.e.: `["five_minute", "hourly", "daily"]`

### Response

Body Params:
- `custom_metric_id`: the unique ID for the metric created. i.e.: `XZ5BDQk`

Status codes:
- `200`: request was successful and we return a body with new information.
- `204`: request was successful and we don't return a body.
- `400`: the url params and body were not correct.
- `403`: you don't have access to execute that operation.
- `404`: metric that you are trying to consume doesn't exist.
- `409`: metric that you are trying to create already exists.
- `500`: there was an internal error and you should retry later.

### Create custom metric

#### Request

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc' \
--data '{
    "name": "sessions_total_v1",
    "metric": "sessions_total",
    "group_by": ["app_version"],
    "filters": {
        "op":"and",
        "children":[{"field_op":"eq","key":"os_version","val":"12"}]
    },
    "time_granularity": ["five_minute", "hourly"]
}'
```

#### Response

Status codes: `200`, `400`, `403`, `409` and `500`.

#### OK
```json 
{
  "custom_metric_id": "y8vayvn",
  "app_id": "appID1",
  "name": "sessions_total_v1",
  "metric": "sessions_total",
  "filters": {
    "op": "and",
    "children": [
      {
        "field_op": "eq",
        "key": "os_version",
        "val": "12"
      }
    ]
  },
  "group_by": [
    "app_version"
  ],
  "time_granularity": [
    "five_minute",
    "hourly"
  ]
}
```

#### Error (500)
```json
{
  "message": "we had an internal error, please try again later"
}
```

### Get custom metrics

#### Request
```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

#### Response
Status codes: `200`, `400`, `409` and `500`.

#### OK (200)
```json
{
  "results": [
    {
      "custom_metric_id": "XZ5BDQk",
      "app_id": "appID1",
      "name": "sessions_total_v1",
      "metric": "sessions_total",
      "filters": {},
      "group_by": [
        "app_version"
      ],
      "time_granularity": [
        "five_minute",
        "hourly"
      ]
    }
  ]
}
```

#### Error (400)
```json
{
  "message": "app id can't be empty"
}
```

### Delete custom metrics

#### Request
```bash
curl -X DELETE --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/sessions_total_v1' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

#### Response
Status codes: `204`, `400`, `403`, `404`, `409` and `500`.

#### OK (204), body is empty

#### Error (404)
```json
{
  "message": "metric sessions_total_v1 doesn't exist"
}
```


