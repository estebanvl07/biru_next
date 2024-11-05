import React, { useState } from "react";

interface useShowFormProps<T> {
  defaultData?: T;
}

const useShowForm = <T>({ defaultData }: useShowFormProps<T>) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState(defaultData);

  const onShowCreate = () => setShowCreate(true);
  const onShowEdit = () => setShowEdit(true);
  const onCloseCreate = () => setShowCreate(false);
  const onCloseEdit = () => setShowEdit(false);
  const onChageData = (data: T) => setData(data);

  return {
    onCloseCreate,
    onCloseEdit,
    onShowCreate,
    onShowEdit,
    showCreate,
    showEdit,
    data,
    onChageData,
  };
};

export default useShowForm;
