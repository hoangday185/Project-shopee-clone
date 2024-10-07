import { Purchase, PurchaseListStatus } from 'src/@types/purchase.types'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    })
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(
      `/${URL}/purchases/update-purchase`,
      body
    )
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: 1 }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
