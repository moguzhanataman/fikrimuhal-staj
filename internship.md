gitfikrimuhal-staj
===============

18/08/2014
---------------
PhoneGap ve Play2/Scala ile geliştireceğimiz projemiz için:
- IDE olarak IntelliJ IDEA ve gerekli pluginleri
- Scala, Play2, Akka için Typesafe Activator
- PhoneGap için node.js'in üzerine npm ve phonegap paketleri

Mac OS X ve Ubuntu işletim sistemleri üzerine yüklenip ayarları yapıldı. Deneme uygulaması yazılıp, Nexus 7 ve iPad mini cihazlarında test edildi. Staj süresince yapılacak olan proje için github repository açıldı ve ilk commit yapıldı.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Client uygulamalarının arayüzünün tasarlanması.
- Arayüz dinamizmi ve kod organizasyonunun sağlanması için angularjs öğrenilmesi ve PhoneGap ile birlikte kullanılması.

19/08/2014
---------------
- Projenin tamamı için mobil wireframe hazırlandı.
- Projede gerekecek olan dataların ne, nasıl, hangi sıra ile, ne zaman ve sıklıkta, hangi yöntem ile çekileceğine karar verildi.
- Login sayfasının görsel arayüzü yapıldı.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Müşteri listesinin görsel arayüzü tasarlanacak.
- Login sayfasının ve müşteri listesinin angularJS ile client sidenın yazılması.
- Phonegap ve iBeacon plugini dökümantasyonunu üzerine çalışılması.

20/08/2014
--------------
- Bütün ekranlar için taslak arayüz hazırlandı. Hepsi bir routinge bağlandı.
- JSON api yazılmasına başlandı

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Ekranlar arasında kaydırma hareketi ile geçişler
- Server client arasında JSON alışveriş yapılacak
- ionic ve angularJS frameworkünün dökümantasyonu üzerine çalışma 

21/08/2014
-------------
- Personel client için müşteri öneri sayfası ve alışveriş sepetinin dataları otomatik olarak oluşturacak modül yazıldı
- JSON üretecek api için gereksinimler belirlenip kodlanmaya başlandı

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Ekranlar arasında kaydırma hareketi ile geçişler
- Serverdan gelecek olan JSON ile sayfaların otomatik oluşturulması
- Ionic ve angularJS frameworkünün dökümantasyonu üzerine çalışma
- JSON için REST api araştırması

22/08/2014
----------
- Ürün öneri sayfası ve alışveriş sepeti sayfalarındali kaydırma efekti düzeltildi
- Ekranların hepsi ionic framework ile yeniden düzenlenmeye başlandı

25/08/2014
----------
- JSON API Dökümantasyonu yazıldı.
- Back-end'in bazı temel işlevler için json döndürmesi sağlandı.
- Front-endde müşteri listesi ve müşteriye öneri listesi sayfası serverdan alınan json dosyaları ile dinamik olarak oluşturulmaya başlandı
- Bütün ekranlar ionic framework ile yeniden tasarlandı ve grid sistemi bootstrapten ionic'e geçirildi.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Side menu yapılacak ve GUI düzeltmeleri ve güzelleştirmeleri

26/08/2014
----------
- Hatalı ionic tagleri düzeltildi
- Giriş ekranı ve müşteri ürün öneri sayfasında GUI düzeltilmeleri yapıldı
- Side menu eklendi
* api baştan tasarlandı
* git'ten yeni branch açıp api implementasyonunu değiştirmeye başladım.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- GUI düzeltmeleri ve güzelleştirmeleri
- Her bir ekranlar için ayrı servicelerin yazılması

27/08/2014
----------
- GUI de düzeltmeler ve geliştirmeler
- Sepet ve müşteri listesi serverdan alınan json ile oluşturuldu
* POST methoduyla yollanan verilerin back-end tarafında doğru parse edilmesi sağlandı.
* Eksik methodlar implement edildi.
* Cart checkout işlemini tersine çevirmesi için. Data seeder methodu yazıldı.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Controllerların ayrı dosyalara gönderilmesi ve controllerların tamamlanması
- Her bir ekranlar için ayrı servicelerin yazılması

28/08/2014
----------
- Her controllerun kendine ait dosyaları oluşturuldu
- Login ekranın service'i yazıldı, bazı buglar ve mantık hataları düzeltildi

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Müşteri listesi service'i yazılıcak

01/09/2014
----------
- StorageService eklendi
- Servicelerin dökümantasyonu düzeltildi
- sepeti resetlemek eklendi
- conf.js dosyası local ip alabilecek şekilde değiştirildi
- Sepete ürün ekleme ve çıkarma eklendi

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- Http requestlerle elde edilen veriler local cachede saklanacak
- Çalışanların şifreleri MD5 ile hashlenecek

02/09/2014
----------
- Müşteri listesi service'i yazıldı
- Çalışanların şifreleri MD5 ile hashlendi
- Http requestlerinden gelen veriler local cachede saklanıyor
- Müşteri clientına başlandı
- Cordovaya iBeacon plugini kuruldu ve ayarlandı
- Çalışanlar ve ürünler için geçici resimler konuldu
- Müşteri clientında uuid, identifier, major ve minor değerlerini ui'dan değiştirilebilir hale getirildi.

Bir sonraki çalışma günü yapılması planlananlar
-----------------------------------------------
- iBeaconın testleri yapılacak, izleme ve yayın yapabilir olacak