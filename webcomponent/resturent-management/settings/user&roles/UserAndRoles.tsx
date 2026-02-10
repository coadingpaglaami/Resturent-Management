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
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Card, CardContent } from "@/components/ui/card";

// ── Import your queries & mutations ──
import {
  useGetUsersListQuery,
  usePauseUser,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useInviteUserMutation,
} from "@/api/auth"; // ← adjust path

import type {
  EntityResponse,
  InviteUserRequest,
  UpdateUserRoleRequest,
} from "@/interface/Auth"; // ← adjust path
import { toast } from "sonner";

export const UserAndRoles = () => {
  // ── Data fetching ──
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useGetUsersListQuery();

  // Mutations
  const pauseMutation = usePauseUser();
  const deleteMutation = useDeleteUserMutation();
  const updateRoleMutation = useUpdateUserRoleMutation();
  const inviteMutation = useInviteUserMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"invite" | "edit">("invite");
  const [selectedUser, setSelectedUser] = useState<EntityResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<EntityResponse | null>(null);

  // Form state
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<"ADMIN" | "MANAGER" | "STAFF">(
    "MANAGER",
  );

  const openInviteDialog = () => {
    setDialogMode("invite");
    setFormEmail("");
    setFormRole("MANAGER");
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: EntityResponse) => {
    setDialogMode("edit");
    setSelectedUser(user);
    setFormEmail(user.email);
    setFormRole(user.role);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (dialogMode === "invite") {
      const payload: InviteUserRequest = {
        email: formEmail.trim(),
        role: formRole,
      };

      if (!payload.email) return; // basic guard

      inviteMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Invitation sent successfully!");
          refetch();

          setIsDialogOpen(false);
          // Optional: invalidate users list here if your query client is accessible
          // queryClient.invalidateQueries({ queryKey: ["allusers"] });
        },
      });
    } else if (dialogMode === "edit" && selectedUser) {
      const payload: UpdateUserRoleRequest = {
        role: formRole,
      };

      updateRoleMutation.mutate(
        { userId: selectedUser.id, payload },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            toast.success("User role updated successfully!");
            refetch();
            // Optional: invalidate here too
          },
        },
      );
    }
  };

  const handleToggleStatus = (user: EntityResponse) => {
    const newActive = user.status !== "ACTIVE"; // assuming backend uses "ACTIVE"/other
    pauseMutation.mutate(
      {
        userId: user.id,
        payload: { is_active: newActive },
      },
      {
        onSuccess: () => {
          toast.success(
            `User ${newActive ? "activated" : "paused"} successfully!`,
          );
          // list will auto-refetch if you set up onSuccess invalidation in the hook
          refetch();
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    deleteMutation.mutate(userToDelete.id, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
        setIsDeleteOpen(false);
        setUserToDelete(null);
        refetch();
      },
    });
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-900 text-blue-100";
      case "MANAGER":
        return "bg-purple-900 text-purple-100";
      case "STAFF":
        return "bg-gray-700 text-gray-100";
      default:
        return "";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "Active"
      ? "bg-green-900 text-green-100"
      : "bg-orange-900 text-orange-100";
  };

  // You can show loading/error states if you want (optional)
  if (isLoading) return <div className="p-8 text-center">Loading users...</div>;
  if (isError)
    return (
      <div className="p-8 text-center text-red-600">Failed to load users</div>
    );

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end">
          <Button onClick={openInviteDialog} variant={"buttonBlue"}>
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
                      <Badge
                        variant="secondary"
                        className={getRoleBadgeClass(user.role)}
                      >
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
                        // Optional: disable edit if current user is not ADMIN or editing another ADMIN
                        disabled={user.role === "ADMIN"}
                        className="disabled:cursor-not-allowed"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(user)}
                        disabled={pauseMutation.isPending}
                      >
                        {user.status === "Active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => {
                          setUserToDelete(user);
                          setIsDeleteOpen(true);
                        }}
                        disabled={
                          deleteMutation.isPending || user.role === "ADMIN"
                        }
                      >
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
        <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800">
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
              <Select
                value={formRole}
                onValueChange={(value) =>
                  setFormRole(value as "ADMIN" | "MANAGER" | "STAFF")
                }
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0 block mx-auto">
            <Button
              onClick={handleSave}
              variant={"buttonBlue"}
              disabled={
                (dialogMode === "invite" && inviteMutation.isPending) ||
                (dialogMode === "edit" &&
                  (updateRoleMutation.isPending || !selectedUser))
              }
            >
              {dialogMode === "invite" ? "Send Invite" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{userToDelete?.email}</span> from
              the system.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setUserToDelete(null);
              }}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive  hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
