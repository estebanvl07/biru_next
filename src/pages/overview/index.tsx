import BooksList from "~/modules/Books/BooksList";
import WithoutSideBar from "~/modules/Layouts/templates/dashbaord/OverviewLayout";

const BooksPage = () => {
  return (
    <WithoutSideBar hasLogo hasLeftContent={false} hasFilter={false}>
      <div className="my-4">
        <h4 className="text-4xl font-semibold">Libros de Finanzas</h4>
        <p className="text-sm">
          Gestiona tus finanzas separando tus cuentas en diferentes libros
        </p>
      </div>
      <BooksList />
    </WithoutSideBar>
  );
};

export default BooksPage;
