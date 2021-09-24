/**
 * RES_CODE
 * @type {Readonly<{SUCCESS: string}>}
 */
export const RES_CODE = Object.freeze({
  SUCCESS: '000000', // 接口成功
  WEAKRISKFAIL: '620001,630002', // 弱风控被拒
  MUTEX: '201901', // 互斥
  OVERDUE: '201002', // 逾期
  PASSERROR: '201401, 203120, 203404', // 支付密码不正确
  PASSFREEZE: '201402, 203119', // 输错5次,账户锁定
})
