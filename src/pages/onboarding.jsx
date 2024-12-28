import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
//import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  // const navigateUser = (currRole) => {
  //   navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  // };

  const handleRoleSelection = async (role) => {
    if (!user) {
      console.error("User object not found");
      return;
    }

    try {
      await user.update({ unsafeMetadata: { role } });
      console.log(`Role updated successfully to: ${role}`);
    } catch (err) {
      console.error("Error updating role:", err);
    } finally {
      // Navigate regardless of the update success or failure
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    }
  };

  // useEffect(() => {
  //   if (user?.unsafeMetadata?.role) {
  //     navigateUser(user.unsafeMetadata.role);
  //   }
  // }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="font-extrabold tracking-tighter gradient-title text-7xl sm:text-8xl">
        I am a...
      </h2>
      <div className="grid w-full grid-cols-2 gap-4 mt-16 md:px-40">
        <Button
          variant="blue"
          className="text-2xl h-36"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="text-2xl h-36"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
