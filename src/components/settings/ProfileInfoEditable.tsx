import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  useEditableControls,
  ButtonGroup,
  Flex,
  Editable,
  EditablePreview,
  Input,
  IconButton,
  EditableInput,
	Button,
} from "@chakra-ui/react";

export default function ProfileInfoEditable() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label={""}
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label={""}
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="right">
        <IconButton
          aria-label={""}
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Flex>
			<Button><EditableControls /></Button>
      <Editable
        textAlign="left"
        defaultValue="Rasengan ⚡️"
        fontSize="2xl"
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        
      </Editable>
    </Flex>
  );
}
