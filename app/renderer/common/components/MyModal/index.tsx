import MyConfirm from './MyConfirm';
import MyDialog from './MyDialog';

/**
 * 方式一：
 * import { Dialog } from '@components/MyModal'
 * <Dialog />
 */
export const Dialog = MyDialog;
export const Confirm = MyConfirm;

/**
 * 方式二：
 * import MyModal from '@components/MyModal'
 * <MyModal.Dialog />
 */
export default {
  Dialog: MyDialog,
  Confirm: MyConfirm,
};
