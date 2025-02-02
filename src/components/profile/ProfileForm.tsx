import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileUpdate {
  username: string;
  email: string;
  fullName: string;
}

interface ProfileFormProps {
  onSubmit: (profile: ProfileUpdate, callback: () => void) => void;
}

export const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const { register, handleSubmit, reset } = useForm<ProfileUpdate>();
  const { toast } = useToast();

  const handleSubmitForm = (data: ProfileUpdate) => {
    onSubmit(data, () => {
      reset();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
      <Input
        {...register("username", { required: true })}
        placeholder="Username"
      />
      <Input
        {...register("email", { required: true })}
        placeholder="Email"
        type="email"
      />
      <Input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
      />
      <Button type="submit">Update Profile</Button>
    </form>
  );
};
