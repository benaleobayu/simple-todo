import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import {TodoCategoryForm} from "@/app/cms/ms/todo-categories/Form_CreateUpdate";

type EditProps = {
    children: ReactNode,
    id?: number,
    isEdit?: boolean,
    isCreate?: boolean,
    onActionCompleted?: () => void,
    className?: string
};

export function CreateUpdateTodoCategory(props: EditProps) {
    const { children, id, isEdit = false, isCreate = false, onActionCompleted, className } = props;
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
                    <DialogTitle>Category</DialogTitle>
                    <DialogDescription>------------------------</DialogDescription>
                </DialogHeader>

                <TodoCategoryForm
                    id={id}
                    isEdit={isEdit}
                    isCreate={isCreate}
                    onActionCompleted={() => {
                        onActionCompleted?.();
                        handleClose();
                    }}
                />

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