package model

import java.util.Date

import play.api.Logger
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
                        lastUpdateTime: Long)

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

    ShopCustomer(
      c.id,
      c.name,
      c.photoData,
      170,
      now,
      doNotDisturbMe,
      false,
      currentEmployeeId,
      now + c.id * 1000
    )
  }

  /** @return Sequence of ShopCustomers by their ranks */
  def rankShopCustomers: Seq[ShopCustomer] = {
    ShopCustomer.all.map { c =>
      (c.customerId, getCustomerRank(c))
    }.sortBy(_._2).map({
      case (id, rank) => ShopCustomer.get(id)
    }) flatten
  }

  /**
   * Finds rank of single customer by a custom function
   * @return rank
   */
  def getCustomerRank(customer: ShopCustomer): Double = {
    val d = customer.distance
    val tu = customer.lastUpdateTime
    // Time elapsed
    val ti = customer.shopEnterTime - tu
    val w = if (customer.doNotDisturbMe) Int.MinValue else 0
    val b = if (customer.isShoppingDone) Int.MinValue else 0
    // Who helps this customer
    val i = 0.5 // if(customer.employeeId.getOrElse(0) == 0)

    1000000 * 1 / d + 1000000 * 1 / ti + w + b + i + 1000000 * 1 / tu
  }

}
