import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  habitName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  habitType: z.string(),
});

export default function ProfileForm() {
  const { user } = useUserStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habitName: "",
      habitType: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addDoc(collection(db, "habit"), {
      habit_name: values.habitName,
      habit_type: values.habitType,
      user_id: user.user_id,
      created_at: Timestamp.now(),
    })
      .then((res) => {
        form.reset();
        toast({
          description: "Habit created successfully!",
        });
      })
      .catch((err) => console.log(err));
    console.log(values);
  }

  const dbInstance = collection(db, "habit");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="habitName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit Name</FormLabel>
              <FormControl>
                <Input placeholder="Habit Name" {...field} />
              </FormControl>
              <FormDescription>This is your habit name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="habitType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a habit type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your habit type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
