var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T749N_5656_0010298528_RT_AAC?$productResponsive$&wid=515',
    title: 'GEL-Kayano 24',
    description: 'The 20+ year success of the industry-leading GEL-Kayano® 24 model is sweet testimony to the continous innovation and thoughtful design of the shoe. Our GEL-Kayano® 24 model offers overpronators stability and comfort, to improve running efficiency and decrease risk of injury over varying distances. Our reliable performer hugs feet and cushions impact to make the last mile as comfortable as the first. Weight: 11.3 oz. Heel Height: 22mm. Forefoot Height: 12mm.',
    price: 160
  }), 
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T800N_9790_0010308359_RT_AAC?$productResponsive$&wid=515',
    title: 'GEL-Nimbus 20',
    description: 'A smooth, comfortable ride that\'s 20 years in the making. Packed with our revolutionary lightweight FlyteFoam® cushioning and other advanced technology from the ASICS® Institute of Sports Science, the Nimbus caters to neutral runners of all levels. Its gradient jacquard-mesh FluidFit® upper strategically adapts to your foot\'s natural motion while 3-D printed overlays offer extra support to give you a customized fit that keeps you going mile after mile. Weight: 10.7. Heel Height: 23mm. Forefoot Height: 13mm.',
    price: 160
  }),
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T834N_9595_0010308411_RT_AAC?$productResponsive$&wid=515',
    title: 'GT-2000 6 Lite-Show',
    description: 'The next GT-2000 6 model comes this year with a fresh take on what can be had at this price point. This iteration is not only lighter, but also more cushioned and lively with every step. The forefoot has been opened up to better accommodate bunions and reduce irritation. The upper incorporates a new last for a better heel fit and slightly more toe spring to help with a smoother transition and keeping you locked down on the platform. The Lite-Show™ version features 3M® reflective no--sew for additional visibility during early morning or evening runs. Weight: 10.5. Heel Height: 22mm. Forefoot Height: 12mm.',
    price: 130
  }),
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T7D0N_4107_0010298548_RT_AAC?$productResponsive$&wid=515',
    title: 'DynaFlyte 2',
    description: 'The momentum continues. Building on the success of the original DynaFlyte™ shoe, our speed-fueling update is ready to jet. ASICS DynaFlyte™ 2 model presses repeat on full-length FlyteFoam® midsole technology and adds ""wings"" in the form of a new Adapt Mesh™ upper, for increased breathability, decreased overall weight and reduced chance of blisters. DynaFlyte™ 2 model is here to give you superb, responsive cushioning with a lightness you might never have thought possible. Prepare to accelerate. Weight: 8.9 oz. Heel Height: 20mm. Forefoot Height: 12mm.',
    price: 130
  }),
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T838N_8282_0010308417_RT_AAC?$productResponsive$&wid=515',
    title: 'GEL-Kenun MX',
    description: 'Designed from the ground up to be comfortable and subtly hip, our shoe has a versatile silhouette you can wear all day for just about any occasion. With our GEL® Technology for rear-foot cushioning and a streamlined upper, your new go-to kicks are as good to your feet as they are for your image. Weight: 11.2 oz. Heel Height: 23mm. Forefoot Height: 13mm.',
    price: 110
  }),
  new Product({
    imagePath: 'https://asics.scene7.com/is/image/asics/T840N_9001_0010308422_RT_AAC?$productResponsive$&wid=515',
    title: 'GEL-Quantum 360 Knit',
    description: 'The GEL-Quantum 360™ Knit shoe is constructed with 360 degrees of GEL® technology cushioning, balancing high performance and maximum comfort. A new stretch knit upper surrounds the foot in a custom, sock-like fit elevating this GEL-Quantum shoe to another level - helping you power through running and cross-training workouts Weight: 12.6. Heel Height: 22. Forefoot Height: 12.',
    price: 180
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}


