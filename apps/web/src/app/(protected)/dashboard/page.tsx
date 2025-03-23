"use client";

import { AppPage } from "@/components/app-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Progress } from "@repo/ui/components/progress";
import {
  CheckCircle2,
  Circle,
  Clock,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for the chart
const mockWeeklyData = [
  { day: "Mon", completed: 3, total: 5 },
  { day: "Tue", completed: 5, total: 7 },
  { day: "Wed", completed: 2, total: 8 },
  { day: "Thu", completed: 7, total: 9 },
  { day: "Fri", completed: 4, total: 6 },
  { day: "Sat", completed: 1, total: 3 },
  { day: "Sun", completed: 2, total: 4 },
];

// Mock recent activity
const mockRecentActivity = [
  {
    id: 1,
    action: "Completed",
    task: "Finish project proposal",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Added",
    task: "Schedule team meeting",
    time: "5 hours ago",
  },
  {
    id: 3,
    action: "Completed",
    task: "Review quarterly goals",
    time: "Yesterday",
  },
  {
    id: 4,
    action: "Added",
    task: "Prepare presentation slides",
    time: "Yesterday",
  },
  {
    id: 5,
    action: "Completed",
    task: "Send follow-up emails",
    time: "2 days ago",
  },
];

export default function Dashboard() {
  // In a real app, you would fetch this data from your state management or API
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  });

  // Simulate loading data
  useEffect(() => {
    // This would normally come from your actual todos
    const mockStats = {
      total: 42,
      completed: 27,
      pending: 15,
      completionRate: 64,
    };
    setStats(mockStats);
  }, []);

  return (
    <AppPage
      title="Dashboard"
      description="Your dashboard for managing your todos"
    >
      <div className="container max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <ListTodo className="mr-1 h-4 w-4" />
                All your tasks
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl">{stats.completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Tasks completed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl">{stats.pending}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-amber-600">
                <Circle className="mr-1 h-4 w-4" />
                Tasks remaining
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completion Rate</CardDescription>
              <CardTitle className="text-3xl">
                {stats.completionRate}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600">
                <TrendingUp className="mr-1 h-4 w-4" />
                Overall progress
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>
                Your task completion over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWeeklyData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-10 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>
                          {day.completed} of {day.total}
                        </span>
                        <span>
                          {Math.round((day.completed / day.total) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(day.completed / day.total) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest todo actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="mt-0.5">
                      {activity.action === "Completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <ListTodo className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.action} "{activity.task}"
                      </p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppPage>
  );
}
