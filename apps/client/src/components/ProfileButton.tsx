"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Orders"
            labelIcon={<ShoppingBag className="w-4 h-4"/>}
            onClick={() => router.push("/orders")}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default ProfileButton;
