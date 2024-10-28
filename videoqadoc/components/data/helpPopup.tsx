import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Link,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Book, HelpCircle, Mail } from "lucide-react";

export const HelpPopup = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button variant="light" isIconOnly onPress={onOpen}>
        <HelpCircle />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <ModalHeader>Need help?</ModalHeader>
              <ModalBody>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                  anchorIcon={<Mail className="ml-2 w-4 h-4" />}
                >
                  Our email
                </Link>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                  anchorIcon={<Book className="ml-2" />}
                >
                  Annotation Guideline
                </Link>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
