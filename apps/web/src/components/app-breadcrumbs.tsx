"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/").slice(1);

  if (pathnameParts.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnameParts.map((part, index) => {
          const isLast = index === pathnameParts.length - 1;

          if (isLast) {
            return (
              <BreadcrumbItem key={part}>
                <BreadcrumbPage className="capitalize">{part}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <React.Fragment key={part}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${part}`} className="capitalize">
                  {part}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
