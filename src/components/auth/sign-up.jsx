import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confromPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    setloading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      toast.success(data.message);
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error({ variant: "default", title: error.message });
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center  text-[#004368] ">
        <div className="space-x-5 p-10 rounded-2xl lg:w-[30vw] w-[90vw">
          <h1 className="lg:text-[3vw] text-[6vw] font-bold ">Sign-Up</h1>
          <div className="pt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FullName</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="FullName"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          className="text-black"
                          {...field}
                        />
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
                          placeholder="Password"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confromPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confrom Password"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" style={{ backgroundColor: "#004368" }}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign-Up"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-10">
            <NavLink to={"/log-in"}>Already have an account?</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
