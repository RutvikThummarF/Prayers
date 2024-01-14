const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');

const router = express.Router();

const multer = require('multer');
const path = require('path');
const setFilePathToBody = require('@/middlewares/uploadMiddleware/setFilePathToBody');

const { hasPermission } = require('@/middlewares/permission');

const groupController = require('@/controllers/appControllers/groupController');
const postController = require('@/controllers/appControllers/postController');

// //_________________________________________________________________API for groups________________

router.route('/group/create').post(hasPermission('create'), catchErrors(groupController.create));
router.route('/group/read/:id').get(hasPermission('read'), catchErrors(groupController.read));
router
  .route('/group/update/:id')
  .patch(hasPermission('update'), catchErrors(groupController.update));
router
  .route('/group/delete/:id')
  .delete(hasPermission('delete'), catchErrors(groupController.delete));
router.route('/group/search').get(hasPermission('read'), catchErrors(groupController.search));
router.route('/group/list').get(hasPermission('read'), catchErrors(groupController.list));
router.route('/group/filter').get(hasPermission('read'), catchErrors(groupController.filter));

// //_________________________________________________________________API for posts________________

router.route('/post/create').post(hasPermission('create'), catchErrors(postController.create));
router.route('/post/read/:id').get(hasPermission('read'), catchErrors(postController.read));
router.route('/post/update/:id').patch(hasPermission('update'), catchErrors(postController.update));
router
  .route('/post/delete/:id')
  .delete(hasPermission('delete'), catchErrors(postController.delete));
router.route('/post/search').get(hasPermission('read'), catchErrors(postController.search));
router.route('/post/list').get(hasPermission('read'), catchErrors(postController.list));
router.route('/post/filter').get(hasPermission('read'), catchErrors(postController.filter));
router.route('/post/listAll').get(hasPermission('read'), catchErrors(postController.listAll));
router.route('/post/addpost').post(hasPermission('create'), catchErrors(postController.addpost));
router.route('/post/readpost/:id').get(hasPermission('read'), catchErrors(postController.readpost));
router.route('/post/listpost').get(hasPermission('read'), catchErrors(postController.listpost));
router
  .route('/post/sendemoji')
  .patch(hasPermission('update'), catchErrors(postController.sendemoji));
router
  .route('/post/replytopost')
  .patch(hasPermission('update'), catchErrors(postController.replytopost));
router
  .route('/post/sendreport')
  .patch(hasPermission('update'), catchErrors(postController.sendreport));

router
  .route('/post/getreport')
  .post(hasPermission('update'), catchErrors(postController.getreport));

module.exports = router;
