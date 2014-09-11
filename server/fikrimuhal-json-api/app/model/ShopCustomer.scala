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
                        lastUpdateTime: Long)

object ShopCustomer {

  implicit val jsonConverter = Json.format[ShopCustomer]

  var _now = new Date().getTime()

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
      now)

  }

}
