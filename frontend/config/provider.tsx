"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProvidersProps } from "@/interfaces";
import { TaskProvider } from "@/contexts/task";
import { AnnotationProvider } from "@/contexts/annotation";

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <AnnotationProvider>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </AnnotationProvider>
      </TaskProvider>
    </QueryClientProvider>
  );
}
