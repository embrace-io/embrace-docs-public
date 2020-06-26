---
title: "Performance Monitoring"
weight: 11
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature.
Embrace uses this mechanism to measure your application launch performance. This is why you must call `endAppStartup` somewhere in your application, as mentioned in the [Session Reporting]({{< relref "/ios/session-reporting" >}}) section.

You can use that same mechanism yourself to measure any portion of your application. We call this concept **moments**. This API is also immediate mode (like [logs]({{< relref "/ios/log-message-api" >}})), meaning your users will incur a networking call whenever you start and stop a moment.

{{< hint info >}}
The performance of the networking calls that Moments make are unrelated to the performance of the Moment itself.
{{< /hint >}}

Moments are best used for tracking critical user flows that are generally short in nature.
For more suggestions on what to measure with Moments, see the [Best Practices]({{< relref "/best-practices/app-performance#keep-it-short" >}}) page.

## Starting a Moment

Here's what a call to start a Moment looks like.

```swift
Embrace.sharedInstance()?.startMoment(withName: "add_item")
```

In a fictional scenario, this is a Moment we're using to measure how quickly our UITableView renders after adding a new item using the plus button.
We start the Moment when we add the item, and we'll end it when the animation finishes.
Our UX designers have been experimenting with different animation styles, and we've read in our reviews that some users get annoyed by the animation and quit the app over it.
We wanted to verify that for ourselves.

You can also start a Moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs]({{< api ios >}}).

## Ending a Moment

Here's how to end a Moment.

```swift
Embrace.sharedInstance()?.endMoment(withName: "add_item")
```

Once you start a Moment, a timer is started.
If you end the Moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the Moment from multiple locations in your app, or from multiple threads. 

## Tracking Abandonment

In addition to performance, Moments also measure abandonment by default. 
For more on tracking abandonment, see the [Best Practices]({{< relref "/best-practices/app-performance" >}}) section.