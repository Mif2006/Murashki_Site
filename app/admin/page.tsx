"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, LogIn, LogOut } from "lucide-react"
import { toast } from "sonner"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [settings, setSettings] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_button_text: "",
    contact_phone_1: "",
    contact_phone_2: "",
    contact_email: "",
    contact_address_line1: "",
    contact_address_line2: "",
    contact_address_line3: "",
    contact_coordinates: "",
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
    if (session) {
      await loadSettings()
    }
    setIsLoading(false)
  }

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')

    if (error) {
      toast.error('Failed to load settings')
      return
    }

    if (data) {
      const settingsObj: any = {}
      data.forEach(setting => {
        settingsObj[setting.key] = setting.value
      })
      setSettings(settingsObj)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
      return
    }

    if (data.session) {
      setIsAuthenticated(true)
      await loadSettings()
      toast.success('Successfully logged in')
    }
    setIsLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    toast.success('Successfully logged out')
  }

  const handleSave = async () => {
    setIsSaving(true)

    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
    }))

    let hasError = false
    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: update.value, updated_at: new Date().toISOString() })
        .eq('key', update.key)

      if (error) {
        hasError = true
        console.error('Error updating setting:', error)
      }
    }

    if (hasError) {
      toast.error('Some settings failed to save')
    } else {
      toast.success('All settings saved successfully')
    }

    setIsSaving(false)
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your website settings</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage the main hero section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Title</Label>
                <Input
                  id="hero_title"
                  value={settings.hero_title}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  placeholder="Main title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Subtitle</Label>
                <Input
                  id="hero_subtitle"
                  value={settings.hero_subtitle}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  placeholder="Subtitle text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_button_text">Button Text</Label>
                <Input
                  id="hero_button_text"
                  value={settings.hero_button_text}
                  onChange={(e) => handleChange('hero_button_text', e.target.value)}
                  placeholder="Button text"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Manage contact details and address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_phone_1">Phone Number 1</Label>
                <Input
                  id="contact_phone_1"
                  value={settings.contact_phone_1}
                  onChange={(e) => handleChange('contact_phone_1', e.target.value)}
                  placeholder="+375 (29) 123-45-67"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone_2">Phone Number 2</Label>
                <Input
                  id="contact_phone_2"
                  value={settings.contact_phone_2}
                  onChange={(e) => handleChange('contact_phone_2', e.target.value)}
                  placeholder="+375 (33) 765-43-21"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email Address</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="contact_address_line1">Address Line 1</Label>
                <Input
                  id="contact_address_line1"
                  value={settings.contact_address_line1}
                  onChange={(e) => handleChange('contact_address_line1', e.target.value)}
                  placeholder="Country, Region"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address_line2">Address Line 2</Label>
                <Input
                  id="contact_address_line2"
                  value={settings.contact_address_line2}
                  onChange={(e) => handleChange('contact_address_line2', e.target.value)}
                  placeholder="District"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address_line3">Address Line 3</Label>
                <Input
                  id="contact_address_line3"
                  value={settings.contact_address_line3}
                  onChange={(e) => handleChange('contact_address_line3', e.target.value)}
                  placeholder="City or Area"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_coordinates">Coordinates</Label>
                <Input
                  id="contact_coordinates"
                  value={settings.contact_coordinates}
                  onChange={(e) => handleChange('contact_coordinates', e.target.value)}
                  placeholder="Coordinates: 55.6416° N, 27.0444° E"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="w-full"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
