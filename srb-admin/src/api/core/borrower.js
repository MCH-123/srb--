import request from '@/utils/request'

export default {
  getPageList(page, limit, keyWord) {
    return request({
      url: `/admin/core/borrower/list/${page}/${limit}`,
      method: 'get',
      params: { keyWord },
    })
  },
  show(id) {
    return request({
      url: `/admin/core/borrower/show/${id}`,
      method: 'get',
    })
  },
  approval(borrowerApproval) {
    return request({
      url: '/admin/core/borrower/approval',
      method: 'post',
      data: borrowerApproval,
    })
  },
}
