"use client";

import { useState } from "react";
import { Trash2, Play, Pause, Edit3, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  status: "Active" | "Paused";
};

const initialUsers: User[] = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Manager", status: "Active" },
  { id: 3, name: "Mike Chen", email: "mike@example.com", role: "Staff", status: "Active" },
];
export const UserAndRoles=()=>{
    const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"invite" | "edit">("invite");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  console.log(selectedUser);

  // Form state for dialog
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<"Admin" | "Manager" | "Staff">("Manager");

  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Paused" : "Active" }
          : user
      )
    );
  };

  const openInviteDialog = () => {
    setDialogMode("invite");
    setFormEmail("");
    setFormRole("Manager");
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setDialogMode("edit");
    setSelectedUser(user);
    setFormEmail(user.email);
    setFormRole(user.role);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    console.log(dialogMode === "invite" ? "Inviting:" : "Updating:", { email: formEmail, role: formRole });
    setIsDialogOpen(false);
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Admin": return "bg-blue-900 text-blue-100";
      case "Manager": return "bg-purple-900 text-purple-100";
      case "Staff": return "bg-gray-700 text-gray-100";
      default: return "";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "Active" ? "bg-green-900 text-green-100" : "bg-orange-900 text-orange-100";
  };
    return(
     <>
      <div className=" flex flex-col gap-3">
        <div className="flex items-center justify-end">
         
          <Button onClick={openInviteDialog} variant={'buttonBlue'}>
            <UserPlus className="mr-2 h-4 w-4 " />
            Invite User
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRoleBadgeClass(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>

                      {/* Play/Pause Toggle Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === "Active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>

                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Shared Dialog for Invite & Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <div className="grid md:grid-cols-2 gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="user@example.com"
                disabled={dialogMode === "edit"}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formRole} onValueChange={(value) => setFormRole(value as "Admin" | "Manager" | "Staff")}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0 block mx-auto">
            <Button onClick={handleSave} variant={'buttonBlue'}>
              {dialogMode === "invite" ? "Send Invite" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    )
}