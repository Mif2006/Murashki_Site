"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface DatePickerProps {
  label: string
  value: Date | null
  onChange: (date: Date | null) => void
  minDate?: Date
}

export default function DatePicker({ label, value, onChange, minDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value || new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  const generateCalendarDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add the days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i)
    }

    return days
  }

  const isDateDisabled = (day: number) => {
    if (!minDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < minDate
  }

  const isSelectedDate = (day: number) => {
    if (!value) return false
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth.getMonth() &&
      value.getFullYear() === currentMonth.getFullYear()
    )
  }

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(newDate)
    setIsOpen(false)
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-10 pr-4 py-2 text-left border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {value ? formatDate(value) : "Выберите дату"}
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-full mt-2 z-50 p-4 shadow-2xl border-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handlePreviousMonth}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-semibold text-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day && handleDateClick(day)}
                  disabled={day ? isDateDisabled(day) : true}
                  className={`
                    p-2 text-sm rounded-md transition-all duration-200
                    ${!day ? "invisible" : ""}
                    ${day && !isDateDisabled(day) ? "hover:bg-primary/20 cursor-pointer" : ""}
                    ${day && isDateDisabled(day) ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                    ${day && isSelectedDate(day) ? "bg-primary text-primary-foreground font-bold hover:bg-primary" : ""}
                    ${day && !isSelectedDate(day) && !isDateDisabled(day) ? "text-foreground" : ""}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
