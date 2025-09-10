import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizContainerProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

/**
 * Page-level container with responsive layout using Card, section landmarks, header/footer slots.
 * Provides consistent layout structure for all quiz components.
 */
export function QuizContainer({ title, subtitle, children }: QuizContainerProps) {
  return (
    <main role="main" className="container mx-auto px-4 py-6 max-w-4xl">
      <Card className="w-full">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-balance">{title}</CardTitle>
          {subtitle && <p className="text-muted-foreground text-lg text-balance">{subtitle}</p>}
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </main>
  )
}
