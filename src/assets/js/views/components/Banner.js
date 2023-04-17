import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Banner(bannerData) {
  return `    
    <div class="slider-section">
      <div class="swiper slider-section__slider">      
        <div class="swiper-wrapper">
              
          ${bannerData
            .map(
              (banner, i) =>
                `<div class="swiper-slide"><a href=${
                  banner.path
                }><img class="carousel-image" src=${banner.urlImg} alt=${
                  'image-' + i
                } /></a></div>`
            )
            .join('')}
        
        </div>
    
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> 
        <div class="swiper-pagination"></div>   
      </div>
    
    </div>   
  `
}

export default Banner
