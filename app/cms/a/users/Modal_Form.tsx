import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ReactNode, useState} from "react";
import {TodoForm} from "@/app/cms/todos/Form_CreateUpdate";
import {UserForm_UpdatePassword} from "@/app/cms/a/users/Form_UpdatePassword";
import {UserForm_CreateUpdate} from "@/app/cms/a/users/Form_CreateUpdate";

type EditProps = {
    children: ReactNode,
    id?: number,
    isEdit?: boolean,
    isCreate?: boolean,
    isPassword?: boolean,
    onActionCompleted?: () => void,
    className?: string
};

export function UserModal_Form(props: EditProps) {
    const {children, isEdit = false, isCreate = false, isPassword = false, onActionCompleted, className} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={`${className}`}>
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit" : isCreate ? "Create" : "Password"}</DialogTitle>
                    <DialogDescription>------------------------</DialogDescription>
                </DialogHeader>

                {isPassword ? (
                    <UserForm_UpdatePassword
                        isPassword
                        onActionCompleted={() => {
                            onActionCompleted?.();
                            handleClose();
                        }}
                    />
                ) : (
                    <UserForm_CreateUpdate
                        isCreate
                        isEdit
                        onActionCompleted={() => {
                            onActionCompleted?.();
                            handleClose();
                        }}
                    />
                )}



                <DialogFooter className="sm:justify-start absolute bottom-5 right-5">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}