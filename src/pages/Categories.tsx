import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";
import { useApi } from "../api/api";
import { useToast } from "../contexts/Notification";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { LuCirclePlus } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import CategoryCreate from "../components/category/CategoryCreate";
import SubCategoryCreate from "../components/category/SubCategoryCreate";
import SubSubCategoryCreate from "../components/category/SubSubCategoryCreate";
import DeleteConsent from "../components/deleteConsent";
import Paginator from "../components/Paginator";
import Select from "../components/Select";
import { useSearchParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import CategoryEdit from "../components/category/CategoryEdit";
import SubCategoryEdit from "../components/category/SubCategoryEdit";
import SubSubCategoryEdit from "../components/category/SubSubCategoryEdit";

function Categories() {
  const api = useApi();
  const [categories, setCategories] = useState<any>();
  const [isOpenCategoryCreate, setIsOpenCategoryCreate] =
    useState<boolean>(false);
  const [deleteCategory, setdeleteCategory] = useState<any>(null);
  const [editCategory, setEditCategory] = useState<any>(null);

  const [isOpenSubCategoryCreate, setIsOpenSubCategoryCreate] =
    useState<any>(null);
  const [deleteSubCategory, setdeleteSubCategory] = useState<any>(null);
  const [editSubCategory, setEditSubCategory] = useState<any>(null);

  const [isOpenSubSubCategoryCreate, setIsOpenSubSubCategoryCreate] =
    useState<any>(null);
  const [deleteSubSubCategory, setdeleteSubSubCategory] =
    useState<any>(null);
  const [editSubSubCategory, setEditSubSubCategory] = useState<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSelectItemPerPage } = useContext(GlobalContext);

  const { addToast } = useToast();

  const fetchCategories = (searchParams: any) => {
    api
      .getCategories(searchParams)
      .then((res) => setCategories(res.data))
      .catch(() => addToast("Fetch Error !", "error"));
  };

  useEffect(() => {
    fetchCategories(searchParams);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Categories</h3>
      </div>

      <Wrapper className="text-[12px] flex flex-col items-start pt-6">
        <ul className="w-full">
          <Button
            onClick={() => setIsOpenCategoryCreate(true)}
            btntype="circle"
            data-tooltip-id={`add-category`}
            data-tooltip-content={"Add Category"}
          >
            +
          </Button>

          <Tooltip
            id={`add-category`}
            place="right"
            style={{ fontSize: 12, fontWeight: "bold" }}
          />

          {categories?.results?.map((cat: any, i: number) => (
            <li key={i} className="w-full ">
              <div className="flex justify-between mt-3 w-full cursor-pointer border border-gray-200 px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 group">
                {cat.name}

                <div className="gap-4 group-hover:flex hidden">
                  <button
                    onClick={() => setIsOpenSubCategoryCreate(cat)}
                    className="cursor-pointer"
                    data-tooltip-id={`add-sub-category-${cat.id}`}
                    data-tooltip-content={"Add Sub Category"}
                  >
                    <LuCirclePlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={()=>setEditCategory(cat)}
                    className="cursor-pointer"
                    data-tooltip-id={`edit-category-${cat.id}`}
                    data-tooltip-content={"Edit Category"}
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setdeleteCategory(cat)}
                    className="cursor-pointer"
                    data-tooltip-id={`delete-category-${cat.id}`}
                    data-tooltip-content={"Delete Category"}
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                  </button>

                  <Tooltip
                    id={`add-sub-category-${cat.id}`}
                    place="top"
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  />
                  <Tooltip
                    id={`edit-category-${cat.id}`}
                    place="top"
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  />
                  <Tooltip
                    id={`delete-category-${cat.id}`}
                    place="top"
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  />
                </div>
              </div>

              {cat?.sub_category &&
                cat.sub_category.map((sub_cat: any, i: number) => {
                  const isLastSubCat = cat.sub_category.length - 1;

                  return (
                    <div key={i} className="relative">
                      <div className="flex w-full">
                        <span
                          className={`${
                            isLastSubCat === i
                              ? "h-[31px] rounded-md"
                              : "h-full"
                          } absolute left-3 top-0  border-l border-gray-300`}
                          style={{ marginLeft: `` }}
                        ></span>

                        <span className="absolute top-[30px] left-3 right-0 w-[16px] border-t  border-gray-300"></span>

                        <div className="ml-7 mt-2 w-full flex justify-between items-center cursor-pointer border border-gray-200 px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 group">
                          {sub_cat.name}

                          <div className="gap-4 group-hover:flex hidden">
                            <button
                              onClick={() =>
                                setIsOpenSubSubCategoryCreate(sub_cat)
                              }
                              className="cursor-pointer"
                              data-tooltip-id={`add-sub-sub-category-${cat.id}`}
                              data-tooltip-content={"Add Sub Sub Category"}
                            >
                              <LuCirclePlus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={()=>setEditSubCategory(sub_cat)}
                              className="cursor-pointer"
                              data-tooltip-id={`edit-sub-category-${cat.id}`}
                              data-tooltip-content={"Edit Sub Category"}
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setdeleteSubCategory(sub_cat)}
                              className="cursor-pointer"
                              data-tooltip-id={`delete-sub-category-${cat.id}`}
                              data-tooltip-content={"Delete Sub Category"}
                            >
                              <AiOutlineDelete className="w-4 h-4" />
                            </button>

                            <Tooltip
                              id={`add-sub-sub-category-${cat.id}`}
                              place="top"
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            />
                            <Tooltip
                              id={`edit-sub-category-${cat.id}`}
                              place="top"
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            />
                            <Tooltip
                              id={`delete-sub-category-${cat.id}`}
                              place="top"
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            />
                          </div>
                        </div>
                      </div>

                      {sub_cat?.sub_sub_category &&
                        sub_cat.sub_sub_category.map(
                          (sub_sub_cat: any, i: number) => {
                            const isLastSubSubCat =
                              sub_cat.sub_sub_category.length - 1;

                            return (
                              <div key={i} className="relative ">
                                <div className="w-full">
                                  <span
                                    className={`${
                                      isLastSubSubCat === i
                                        ? "h-[28px] rounded-md"
                                        : "h-full"
                                    } absolute left-10 top-0 border-l  border-gray-300`}
                                    style={{ marginLeft: `` }}
                                  ></span>
                                  <span className="absolute top-7 left-10 right-0 w-[16px] border-t  border-gray-300"></span>

                                  <div className="flex w-full ">
                                    <div className="ml-[56px] mt-2 w-full flex justify-between  cursor-pointer border border-gray-200 px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 group">
                                      {sub_sub_cat.name}

                                      <div className="gap-4 group-hover:flex hidden">
                                        <button
                                          onClick={()=>setEditSubSubCategory(sub_sub_cat)}
                                          className="cursor-pointer"
                                          data-tooltip-id={`edit-sub-sub-category-${sub_sub_cat.id}`}
                                          data-tooltip-content={
                                            "Edit Sub Sub Category"
                                          }
                                        >
                                          <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() =>
                                            setdeleteSubSubCategory(
                                              sub_sub_cat
                                            )
                                          }
                                          className="cursor-pointer"
                                          data-tooltip-id={`delete-sub-sub-category-${sub_sub_cat.id}`}
                                          data-tooltip-content={
                                            "Delete Sub Sub Category"
                                          }
                                        >
                                          <AiOutlineDelete className="w-4 h-4" />
                                        </button>

                                        <Tooltip
                                          id={`edit-sub-sub-category-${sub_sub_cat.id}`}
                                          place="top"
                                          style={{
                                            fontSize: 12,
                                            fontWeight: "bold",
                                          }}
                                        />
                                        <Tooltip
                                          id={`delete-sub-sub-category-${cat.id}`}
                                          place="top"
                                          style={{
                                            fontSize: 12,
                                            fontWeight: "bold",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                })}
            </li>
          ))}
        </ul>
      </Wrapper>

      <Wrapper className="mt-2">
        <div>{categories && <Paginator data={categories} />}</div>

        <div>
          <Select
            value={searchParams.get("pages") || ""}
            onChange={handleSelectItemPerPage}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </Select>
        </div>
      </Wrapper>

      {/* Create Modal */}

      {isOpenCategoryCreate && (
        <CategoryCreate
          isOpen={isOpenCategoryCreate}
          onClose={() => setIsOpenCategoryCreate(false)}
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {isOpenSubCategoryCreate && (
        <SubCategoryCreate
          isOpen={isOpenSubCategoryCreate ? true : false}
          onClose={() => setIsOpenSubCategoryCreate(false)}
          category={isOpenSubCategoryCreate}
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {isOpenSubSubCategoryCreate && (
        <SubSubCategoryCreate
          isOpen={isOpenSubSubCategoryCreate ? true : false}
          onClose={() => setIsOpenSubSubCategoryCreate(null)}
          subCategory={isOpenSubSubCategoryCreate}
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {/* Delete Consent */}

      {deleteCategory && (
        <DeleteConsent
          isOpen={deleteCategory ? true : false}
          onClose={() => setdeleteCategory(null)}
          item={deleteCategory}
          path={`store/category/api/category/${deleteCategory?.id}/`}
          name="Category"
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {deleteSubCategory && (
        <DeleteConsent
          isOpen={deleteSubCategory ? true : false}
          onClose={() => setdeleteSubCategory(null)}
          item={deleteSubCategory}
          path={`store/category/api/sub-category/${deleteSubCategory?.id}/`}
          name="Sub Category"
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {deleteSubSubCategory && (
        <DeleteConsent
          isOpen={deleteSubSubCategory ? true : false}
          onClose={() => setdeleteSubSubCategory(null)}
          item={deleteSubSubCategory}
          path={`store/category/api/sub-sub-category/${deleteSubSubCategory?.id}/`}
          name="Sub Sub Category"
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {/* //Edit category Subcategory SubSubcategory */}
      {editCategory && (
        <CategoryEdit
          isOpen={editCategory ? true : false}
          onClose={() => setEditCategory(null)}
          previous={editCategory}
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {editSubCategory && (
        <SubCategoryEdit
          isOpen={editSubCategory ? true : false}
          onClose={() => setEditSubCategory(null)}
          previous={editSubCategory}
          refresh={() => fetchCategories(searchParams)}
        />
      )}

      {editSubSubCategory && (
        <SubSubCategoryEdit
          isOpen={editSubSubCategory ? true : false}
          onClose={() => setEditSubSubCategory(null)}
          previous={editSubSubCategory}
          refresh={() => fetchCategories(searchParams)}
        />
      )}
    </div>
  );
}

export default Categories;
