"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Building,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/actions/updateProfile";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const SettingsDashboardPage = ({ user = {}, profile = {} }) => {
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] =
    useState(true);
  const [isSmsNotificationsEnabled, setIsSmsNotificationsEnabled] =
    useState(false);

  const [updating, setUpdating] = useState(false);

  const router = useRouter();

  // Profile form schema and form setup
  const profileFormSchema = z.object({
    farmName: z
      .string()
      .min(2, { message: "Farm name must be at least 2 characters." }),
    bio: z.string().max(160).min(4),
    location: z.string().optional(),
    contactEmail: z
      .string()
      .email({ message: "Please enter a valid email address." }),
    contactNumber: z.string().optional(),
    link: z.string().url({ message: "Please enter a valid URL." }).optional(),
  });

  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      farmName: profile?.farmName || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      contactEmail: profile?.contactEmail || "",
      contactNumber: profile?.contactNumber || "",
      link: profile?.link || "",
    },
  });

  const handleProfileSubmit = async (data) => {
    setUpdating(true);
    const res = await updateProfile(data);
    if (res.error) {
      toast.error(res.error);
      setUpdating(false);
    }
    toast.success("Updated successfully!");
    setUpdating(false);
    router.refresh();
  };

  console.log(profile, user);
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>
                Edit and manage your farm details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <FormField
                    control={profileForm.control}
                    name="farmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-8"
                              placeholder="Your farm name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The name of your farm or business
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell customers about your farm and what you grow..."
                            className="resize-none min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a brief description about your farm and farming
                          practices
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-8"
                              placeholder="123 Farm Road, Rural County"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your farm&apos;s location or service area
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-8"
                                type="email"
                                placeholder="contact@myfarm.com"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-8"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-8"
                              placeholder="https://www.myfarm.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your farm&apos;s website or social media profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    Save Changes {updating && <BeatLoader color="green" />}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-32 h-32">
                  <AvatarImage scr={profile?.image} />
                  <AvatarFallback className="text-7xl">
                    {user?.firstname && user?.lastname ? (
                      user.firstname[0].toUpperCase() +
                      user.lastname[0].toUpperCase()
                    ) : (
                      <User className="w-28 h-28 p-3" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="info">
                  <h2 className="name text-lg">{`${user?.firstname ?? ""} ${
                    user?.lastname ?? ""
                  }`}</h2>
                  <p className="username text-muted-foreground text-sm">
                    @{user?.username}
                  </p>
                  <p className="email text-muted-foreground text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <p className="flex grow items-center gap-2">
                  <span className="font-bold capitalize">Firstname:</span>{" "}
                  <span className="p-2 border rounded w-full">
                    {user?.firstname ?? "Error fetching firstname"}
                  </span>
                </p>
                <p className="flex grow items-center gap-2">
                  <span className="font-bold capitalize">Lastname:</span>{" "}
                  <span className="p-2 border rounded w-full">
                    {user?.lastname ?? "Error fetching lastname"}
                  </span>
                </p>
              </div>
              {Object.entries({
                email: user?.email,
                username: user?.username,
                role: user?.role,
                ...profile,
              }).map(([key, value]) => (
                <p key={key + value} className="flex items-center gap-2">
                  <span className="font-bold capitalize ">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                  </span>{" "}
                  <span className="p-2 border rounded grow">
                    {value ?? (
                      <span className="italic text-muted-foreground">None</span>
                    )}
                  </span>
                </p>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/settings/edit-profile">
                  Edit profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates and activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account activity.
                  </p>
                </div>
                <Switch
                  checked={isEmailNotificationsEnabled}
                  onCheckedChange={setIsEmailNotificationsEnabled}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive SMS notifications about your account activity.
                  </p>
                </div>
                <Switch
                  checked={isSmsNotificationsEnabled}
                  onCheckedChange={setIsSmsNotificationsEnabled}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save notification settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account&apos;s security settings and devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">
                  Two-factor authentication
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Change your password or reset it if you&apos;ve forgotten it.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Devices</h3>
                <p className="text-sm text-muted-foreground">
                  Manage the devices that are currently logged into your
                  account.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update security settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Manage your billing information and view your invoice history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <p className="text-sm text-muted-foreground">
                  You are currently on the <strong>Pro Plan</strong> at
                  $19.99/month.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <p className="text-sm text-muted-foreground">
                  Your current payment method is a Visa card ending in 1234.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Billing History</h3>
                <p className="text-sm text-muted-foreground">
                  View and download your past invoices.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Manage Billing</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsDashboardPage;
