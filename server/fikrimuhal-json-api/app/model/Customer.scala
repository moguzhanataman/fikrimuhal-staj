package model

/**
* Created by oguzhan on 8/21/14.
 */


case class Customer(id: Int, name: String, previousPurchases: Seq[Product], photo: String)

object Customer {
  val products = model.Product.dummy
  val dummy = Seq(
    Customer(1, "Ahmet", Seq(products(0), products(1)), "photourl"),
    Customer(2, "Mehmet", Seq(products(2), products(0)), "photourl"),
    Customer(3, "Hilmi", Seq(products(1), products(2)), "photourl")
  )

  def get(id: Int): Option[Customer] = dummy.find(id == _.id)
}