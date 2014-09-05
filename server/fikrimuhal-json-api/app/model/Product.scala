package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Product(id: Int, name: String, price: BigDecimal, popularity: Int, photo: String)

object Product {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Product]

  val all = Seq(
    Product(11, "NORTH COAST", 135.99, 1, "./img/products/jeans/11.jpg"),
    Product(12, "M&S COLLECTION", 335.99, 1, "./img/products/jeans/12.jpeg"),
    Product(13, "Water Resistant Jeans with Comfort Stretch", 354, 1, "./img/products/jeans/13.jpeg"),
    Product(14, "Basic Wash Jeans", 12, 1, "./img/products/jeans/14.jpeg"),
    Product(15, "Big & Tall Denim Jeans with Comfort Stretch", 321, 1, "./img/products/jeans/11.jpg"),
    Product(16, "Tapered Leg Denim Jeans with ", 34, 1, "./img/products/jeans/15.jpeg"),
    Product(17, "Smart Jeans with StayNEW", 222, 1, "./img/products/jeans/16.jpeg"),
    Product(18, "Tapered Jeans with Comfort Stretch", 443, 1, "./img/products/jeans/17.jpeg"),
    Product(19, "Jeans with Comfort Stretch", 999, 1, "./img/products/jeans/18.jpeg"),
    Product(20, "Rinse Washed Stretch Denim Jeans", 735.99, 1, "./img/products/jeans/19.jpeg"),
    Product(21, "Water Resistant Jeans with Comfort Stretch", 22.99, 1, "./img/products/jeans/20.jpeg"),
    Product(1, "Kırmızı tişört", 35.99, 1, "./img/products/t-shirt.jpg"),
    Product(2, "Kot pantolon", 95.00, 2, "./img/products/kot.jpg"),
    Product(3, "Gömlek", 10.50, 3, "./img/products/shirt.jpg"),
    Product(4, "Atkı", 20.00, 4, "./img/products/atki.jpg")
  )

  def get(id: Int) = Product.all.find(_.id == id)

  /**
   * Sort data by popularity in ascending order
   * @param limit how many items will be shown
   * @return
   */
  def takeMostPopular(limit: Int) = all.sortBy(-_.popularity).take(limit)
}


