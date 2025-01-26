import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useCreateHotel } from "./useCreateHotel";
import { useEditHotel } from "./useEditHotel";

// 页面中生成一个表单，用于创建酒店
function CreateHotelForm({ hotelToEdit = {}, onCloseModal }) {
  // 创建酒店信息 导入
  const { isCreating, createHotel } = useCreateHotel();
  // 编辑酒店信息 导入
  const { isEditing, editHotel } = useEditHotel();
  const isWorking = isCreating || isEditing; // 判断是否正在创建或编辑酒店信息

  const { id: editId, ...editValues } = hotelToEdit;
  const isEditSession = Boolean(editId);

  // *useForm是一个自定义的Hook，它返回了一个对象，包含了我们需要的所有方法和属性
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  // 提交表单
  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editHotel(
        {
          newHotelData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createHotel(
        { ...data, image: image },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  // 提交表单错误处理
  function onError() {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="部屋タイプ" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          // 添加验证规则
          {...register("name", {
            required: "この項目は必須です",
          })}
        />
      </FormRow>
      <FormRow label="宿泊人数" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          // 添加验证规则
          {...register("maxCapacity", {
            required: "この項目は必須です",
            min: {
              value: 1,
              message: "宿泊人数は少なくとも1である必要があります",
            },
          })}
        />
      </FormRow>
      <FormRow label="予約料金" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "この項目は必須です",
            min: {
              value: 1,
              message: "価格は1$以上である必要があります",
            },
          })}
        />
      </FormRow>
      <FormRow label="割引価格" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "この項目は必須です",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "割引は通常価格より低くなければなりません",
          })}
        />
      </FormRow>
      <FormRow label="部屋概要" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "この項目は必須です",
          })}
        />
      </FormRow>
      <FormRow label="部屋写真">
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "この項目は必須です",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          // 点击按钮时，关闭模态框，如果没有传递onCloseModal，则不执行
          onClick={() => onCloseModal?.()}
        >
          キャンセル
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "部屋を編集" : "新規追加"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateHotelForm.propTypes = {
  hotelToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateHotelForm;
