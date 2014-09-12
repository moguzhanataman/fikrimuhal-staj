package model

import java.util.Date

import play.api.libs.json.Json

/**
 * Created by oguzhan on 9/9/14.
 */
case class ShopCustomer(customerId: Int,
                        name: String, // @Deprecated?
                        photoUrl: String, // @Deprecated?
                        distance: Int, // cm
                        shopEnterTime: Long,
                        doNotDisturbMe: Boolean,
                        isShoppingDone: Boolean,
                        employeeId: Option[Int],
                        lastUpdateTime: Long,
                        rank: Long)

object ShopCustomer {

  implicit val jsonConverter = Json.format[ShopCustomer]

  var _now = new Date().getTime()

  /** @return single ShopCustomer by their customerId */
  def get(customerId: Int) = ShopCustomer.all.find(_.customerId == customerId)

  /** @return Sequence of all ShopCustomers */
  def all = Customer.all.map { c =>
    val now: Long = _now - 111 * 1111 * c.id
    val currentEmployeeId = {
      val x = c.id % 7
      if (x == 0) None else Some(x)
    }
    val doNotDisturbMe = c.id % 9 == 0
    val distance = 170
    val lastUpdateTime = now + c.id * 1000
    val isShoppingDone = false

    ShopCustomer(
      c.id,
      c.name,
      c.photoData,
      distance,
      now,
      doNotDisturbMe,
      isShoppingDone,
      currentEmployeeId,
      lastUpdateTime,
      calculateCustomerRank(distance, lastUpdateTime, now, doNotDisturbMe, isShoppingDone)
    )
  }

  /** @return Sequence of ShopCustomers by their ranks */
  def rankShopCustomers: Seq[ShopCustomer] = ShopCustomer.all.sortBy(-_.rank)

  /**
   * Finds rank of single customer by a custom function
   * @return rank
   */
  def calculateCustomerRank(d: Int, tu: Long, shopEnterTime: Long, doNotDisturbMe: Boolean, isShoppingDone: Boolean): Long = {
    // Time elapsed
    val ti = tu - shopEnterTime
    val w = if (doNotDisturbMe) 0 else 1
    val b = if (isShoppingDone) 0 else 1

    // Who helps this customer
    val i = 0 // if(customer.employeeId.getOrElse(0) == 0)

    val c_1 = 1000
    val c_2 = 1000
    val c_3 = 1000
    val c_4 = 1000
    val c_5 = 1000
    val c_6 = 1000

    c_1 * 1 / d +       // Alete olan uzaklıgı
      c_2 * 1 / ti +    // Mağazaya giriş zamanı
      c_3 * w +         // Do not disturb me!
      c_4 * b +         // Is shopping done?
      c_5 * i +         // Müşteriye kim yardım ediyor? (ben: 1, başkası: 0.5, kimse:0.9)
      c_6 * 1 / tu      // Son güncelleme zamanı
  }

}
