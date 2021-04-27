import { Router } from 'express';
import multer from 'multer';

import AuthenticationController from '../middlewares/AuthenticationController';
import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoriesController from '../modules/cars/useCases/importCategories/ImportCategoriesController';
import ListCategoriesController from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const authenticationController = new AuthenticationController();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get(
  '/',
  authenticationController.handle,
  listCategoriesController.handle,
);

const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export { categoriesRoutes };
