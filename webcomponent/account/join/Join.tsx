"use client";

import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";
import { useVerifyInviteTokenQuery, useRegisterMutation } from "@/api/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  token: string;
}

/* ------------------ */
/* ZOD SCHEMA */
/* ------------------ */

const formSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(6, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const Join = ({ token }: Props) => {
    console.log(token)
  const router = useRouter();

  /* ------------------ */
  /* Verify Token */
  /* ------------------ */

  const { data, isLoading, isError } = useVerifyInviteTokenQuery(token);

  const registerMutation = useRegisterMutation();

  /* ------------------ */
  /* React Hook Form */
  /* ------------------ */

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    },
  });

  /* ------------------ */
  /* Loading State */
  /* ------------------ */

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  /* ------------------ */
  /* Invalid Token */
  /* ------------------ */

  if (isError || !data || data.valid === false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6">
        <XCircle className="h-20 w-20 text-red-500" />
        <h1 className="text-2xl font-semibold">Invitation Expired</h1>
        <p className="text-muted-foreground text-center">
          This invitation link is invalid or expired.
        </p>

        <Button onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  /* ------------------ */
  /* Submit Handler */
  /* ------------------ */

  const onSubmit = (values: FormValues) => {
    registerMutation.mutate(
      {
        token,
        ...values,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  /* ------------------ */
  /* Valid Token → Show Form */
  /* ------------------ */

  return (
    <div className="flex  items-center justify-center px-4">
      <Card className="w-full min-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Complete Registration
          </CardTitle>

          <p className="text-sm text-muted-foreground text-center mt-2">
            Invited as <span className="font-medium">{data.email}</span>
            <br />
            Role: <span className="font-medium">{data.role}</span>
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
