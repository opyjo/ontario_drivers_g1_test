"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIAssistantProps {
  className?: string
}

const DRIVING_KNOWLEDGE_BASE = {
  roadSigns: {
    regulatory: [
      "Stop signs - Complete stop required",
      "Yield signs - Give way to other traffic",
      "Speed limit signs - Maximum safe speed",
      "No parking signs - Parking prohibited",
      "One way signs - Traffic direction",
    ],
    warning: [
      "Curve ahead signs - Reduce speed for turns",
      "School zone signs - Reduced speed, watch for children",
      "Construction signs - Work zone ahead",
      "Pedestrian crossing - Watch for pedestrians",
      "Slippery when wet - Adjust driving for conditions",
    ],
    information: [
      "Highway route markers - Road identification",
      "Distance signs - Mileage to destinations",
      "Service signs - Gas, food, lodging",
      "Tourist information - Points of interest",
    ],
  },
  trafficLaws: {
    rightOfWay: [
      "Four-way stop: First to arrive goes first",
      "Left turns: Yield to oncoming traffic",
      "Pedestrians: Always have right-of-way in crosswalks",
      "Emergency vehicles: Always yield immediately",
      "Uncontrolled intersections: Yield to traffic on your right",
    ],
    speedLimits: [
      "Residential areas: Typically 50 km/h",
      "School zones: 30-40 km/h when children present",
      "Highways: 80-100 km/h depending on location",
      "Construction zones: Follow posted reduced speeds",
    ],
    parking: [
      "Fire hydrants: No parking within 5 meters",
      "Intersections: No parking within 9 meters",
      "Crosswalks: No parking within 6 meters",
      "Bus stops: No parking within 15 meters",
    ],
  },
  safetyTips: [
    "Always check blind spots before changing lanes",
    "Maintain 3-second following distance in good weather",
    "Use turn signals at least 30 meters before turning",
    "Come to complete stops at stop signs",
    "Adjust speed for weather and road conditions",
  ],
}

export function AIAssistant({ className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Welcome to DriveTest Pro! I'm your AI driving instructor assistant. What would you like to learn about today?`,
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(
      () => {
        const aiResponse = generateResponse(userMessage.content)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse.content,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const generateResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase()

    if (input.includes("road sign") || input.includes("sign")) {
      const signType = input.includes("stop") ? "stop" : input.includes("yield") ? "yield" : "general"

      if (signType === "stop") {
        return {
          content: `🛑 **Stop Signs - Complete Guide:**

**What to do:**
1. Come to a COMPLETE stop (wheels stop moving)
2. Stop behind the stop line or crosswalk
3. Look left, right, then left again
4. Proceed only when safe

**Common Mistakes:**
• Rolling stops (not coming to complete stop)
• Stopping in the crosswalk
• Not checking all directions

**At 4-Way Stops:**
• First to arrive goes first
• If simultaneous arrival, right-of-way goes to the right
• Always make eye contact with other drivers

This is frequently tested - practice identifying proper stopping procedures!`,
        }
      }

      return {
        content: `🚸 **Road Signs - Complete Overview:**

**Three Main Categories:**

🔴 **Regulatory Signs** (Tell you what to do):
${DRIVING_KNOWLEDGE_BASE.roadSigns.regulatory.map((sign) => `• ${sign}`).join("\n")}

⚠️ **Warning Signs** (Alert to hazards):
${DRIVING_KNOWLEDGE_BASE.roadSigns.warning.map((sign) => `• ${sign}`).join("\n")}

ℹ️ **Information Signs** (Provide helpful info):
${DRIVING_KNOWLEDGE_BASE.roadSigns.information.map((sign) => `• ${sign}`).join("\n")}

**Study Tip:** Focus on shapes and colors - they give clues about the sign's purpose even if you can't read the text clearly.`,
      }
    }

    if (input.includes("right of way") || input.includes("right-of-way")) {
      return {
        content: `🚦 **Right-of-Way Rules - Master These:**

${DRIVING_KNOWLEDGE_BASE.trafficLaws.rightOfWay.map((rule) => `✅ ${rule}`).join("\n")}

**Special Situations:**
• **Roundabouts:** Yield to traffic already in the circle
• **Merging:** Yield to traffic in the lane you're entering
• **Parking lots:** Treat as if stop signs exist at intersections

**Memory Tip:** When in doubt, yield! It's always safer to be cautious.

**Test Focus:** Right-of-way questions make up about 25% of the exam, so master these rules!`,
      }
    }

    if (input.includes("speed limit") || input.includes("speed")) {
      return {
        content: `🚗 **Speed Limits in Canada:**

${DRIVING_KNOWLEDGE_BASE.trafficLaws.speedLimits.map((limit) => `📍 ${limit}`).join("\n")}

**Key Principles:**
• Speed limits are MAXIMUMS - drive slower when conditions require
• School zones: Reduced speeds when children are present (usually 7 AM - 6 PM on school days)
• Construction zones: Fines are often doubled for speeding

**Factors Requiring Reduced Speed:**
• Rain, snow, or ice
• Heavy traffic
• Poor visibility
• Pedestrians present

**Test Tip:** Questions often ask about adjusting speed for conditions, not just posted limits.`,
      }
    }

    if (input.includes("tip") || input.includes("advice") || input.includes("test")) {
      return {
        content: `🎯 **Expert Test Preparation Tips:**

**Study Strategy:**
1. **Study systematically** - Cover all topics thoroughly
2. **Practice regularly** - Repetition builds confidence
3. **Take practice tests** - Get familiar with question format
4. **Review mistakes** - Learn from errors

**Test Day Success:**
• Get 8+ hours of sleep the night before
• Eat a good breakfast
• Arrive 15 minutes early
• Bring required ID and documents
• Stay calm and read each question carefully

**During the Test:**
• Read questions twice before answering
• Eliminate obviously wrong answers first
• Don't second-guess yourself too much
• Manage your time (30 minutes for 40 questions)

**Success Rate:** Students who study thoroughly have a 95% pass rate!`,
      }
    }

    if (input.includes("nervous") || input.includes("anxiety") || input.includes("scared")) {
      return {
        content: `😌 **Managing Test Anxiety - You've Got This!**

**Before the Test:**
• Study thoroughly until you feel confident
• Take practice tests until you consistently score 90%+
• Practice deep breathing exercises
• Visualize success - imagine yourself passing

**During the Test:**
• Take slow, deep breaths if you feel anxious
• Start with questions you know well to build confidence
• Skip difficult questions and return to them later
• Remember: You can retake the test if needed

**Confidence Boosters:**
• The test is designed to ensure you're a safe driver, not to trick you
• Most questions test common-sense driving knowledge
• You've prepared well by studying

**Remember:** Trust your preparation and stay calm!`,
      }
    }

    if (input.includes("parking") || input.includes("park")) {
      return {
        content: `🅿️ **Parking Rules - Know These Well:**

${DRIVING_KNOWLEDGE_BASE.trafficLaws.parking.map((rule) => `🚫 ${rule}`).join("\n")}

**Additional Parking Rules:**
• Always park in the direction of traffic flow
• Check for time restrictions and permits required
• Don't block driveways, even partially
• Leave space for other vehicles to exit

**Parallel Parking Tips:**
1. Signal and pull alongside the front car
2. Reverse slowly while turning steering wheel
3. Straighten when your car is at 45° angle
4. Continue backing while straightening wheel
5. Adjust position as needed

**Test Note:** Parking questions are common - know the distances!`,
      }
    }

    if (input.includes("weather") || input.includes("rain") || input.includes("snow")) {
      return {
        content: `🌧️ **Driving in Different Weather Conditions:**

**Rain/Wet Roads:**
• Reduce speed by 10-15 km/h
• Increase following distance to 4-6 seconds
• Use headlights (required by law in many areas)
• Avoid sudden braking or steering

**Snow/Ice:**
• Reduce speed significantly
• Increase following distance to 8-10 seconds
• Accelerate and brake gently
• If you skid: steer in direction you want to go, ease off gas

**Fog:**
• Use low-beam headlights (not high beams)
• Reduce speed and increase following distance
• Use fog lights if available
• Pull over if visibility is too poor

**General Rule:** Adjust your driving to match conditions - speed limits are for ideal conditions only!`,
      }
    }

    if (input.includes("safety") || input.includes("safe driving")) {
      return {
        content: `🛡️ **Essential Safe Driving Practices:**

${DRIVING_KNOWLEDGE_BASE.safetyTips.map((tip) => `✅ ${tip}`).join("\n")}

**Defensive Driving Principles:**
• Always assume other drivers might make mistakes
• Keep your eyes moving - scan constantly
• Maintain escape routes when possible
• Stay focused - avoid distractions

**Common Safety Mistakes:**
• Following too closely
• Not checking blind spots
• Distracted driving (phone, eating, etc.)
• Aggressive driving behaviors

**Remember:** The goal isn't just to pass the test, but to become a safe, responsible driver!`,
      }
    }

    return {
      content: `I'm your expert driving test preparation assistant! I'm here to help you succeed on your driving test.

🚗 **I can help you with:**
• Traffic Laws & Rules (right-of-way, speed limits, parking)
• Road Signs & Signals (regulatory, warning, information)
• Safe Driving Practices (weather conditions, defensive driving)
• Test Preparation Strategies (study tips, anxiety management)
• Driving Safety Tips (following distance, blind spots)

**Popular Topics:**
• Road signs and their meanings
• Right-of-way rules at intersections
• Speed limits and when to adjust speed
• Parking regulations and distances
• Weather driving conditions

What would you like to learn about?`,
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse hover:animate-none hover:scale-110 active:scale-95"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 transition-transform duration-200" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-96 shadow-2xl border-0 z-50 flex flex-col transition-all duration-500 ease-in-out transform ${
        isMinimized ? "h-16" : "h-[600px]"
      } ${isOpen ? "animate-in slide-in-from-bottom-4 fade-in-0" : ""} ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 animate-pulse" />
          <CardTitle className="text-lg font-semibold">DriveTest AI Assistant</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-12" />
            ) : (
              <Minimize2 className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-12" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95 hover:rotate-90"
          >
            <X className="h-4 w-4 transition-transform duration-300" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="space-y-2"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] ${
                          message.role === "user" ? "bg-primary text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp
                            ? message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            : "Now"}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {message.role === "assistant" && message.suggestions && (
                      <div className="ml-11 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setInput(suggestion)}
                            className="text-xs h-6 px-2 bg-primary/5 hover:bg-primary/10 border-primary/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                            style={{
                              animation: `slideInRight 0.3s ease-out ${index * 0.1}s both`,
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start animate-in fade-in-0 slide-in-from-left-4 duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-spin">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-muted text-foreground rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about driving rules, road signs, or test preparation..."
                  className="flex-1 min-h-[40px] max-h-[100px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className={`h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  <Send className={`h-4 w-4 transition-transform duration-200 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
;<style jsx global>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`}</style>
