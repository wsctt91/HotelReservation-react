import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { CreateEditHotel } from "../../services/apiHotels";

// 页面中生成一个表单，用于创建酒店
function CreateHotelForm({ hotelToEdit = {} }) {
  const { id: editId, ...editValues } = hotelToEdit;
  const isEditSession = Boolean(editId);

  // *useForm是一个自定义的Hook，它返回了一个对象，其中包含了register和handlerSubmit方法
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  const queryClient = useQueryClient();
  // 创建酒店信息
  const { mutate: createHotel, isLoading: isCreating } = useMutation({
    mutationFn: CreateEditHotel,
    onSuccess: () => {
      toast.success("Hotel created successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  // 编辑酒店信息
  const { mutate: editHotel, isLoading: isEditing } = useMutation({
    mutationFn: ({ newHotelData, id }) => CreateEditHotel(newHotelData, id),
    onSuccess: () => {
      toast.success("Hotel created successfully");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing; // 判断是否正在创建或编辑酒店信息

  // 提交表单
  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editHotel({
        newHotelData: { ...data, image },
        id: editId,
      });
    else createHotel({ ...data, image: image });
  }
  // 提交表单错误处理
  function onError() {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Hotel name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          // 添加验证规则
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          // 添加验证规则
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Room photo">
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          リセット
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "Edit hotel" : "Create new hotel"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateHotelForm.propTypes = {
  hotelToEdit: PropTypes.object,
};

export default CreateHotelForm;
