import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateCategoryController from "../modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoriesController from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import ListCategoriesController from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
