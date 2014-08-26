package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Cart(id: Int, customerId: Int, employeeId: Int, itemList: Seq[Product])

object Cart {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Cart]

  val products = model.Product.all
  val all = Seq(
    Cart(1, 2, 3, products),
    Cart(3, 5, 8, products),
    Cart(2, 7, 6, products)
  )

  def get(id: Int): Option[Cart] = all.find(id == _.id)
}