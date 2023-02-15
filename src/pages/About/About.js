import React from 'react'
import { Link } from 'react-router-dom'
import { tabTitle } from '../../PageTabTitle/pageTabTitle'
import './About.css'

export default function About() {

  tabTitle('Մեր մասին - MobiShop')

  return (
    <section className='about_container'>
      <div className='about_box'>
        <div className="about_us_box">
          <div className="about_title">
            <h2>Մեր մասին</h2>
          </div>
          <div className="about_desc">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt eius esse dolores quas doloribus mollitia blanditiis, doloremque ipsa officia distinctio magni dolore dolorem. Quod sed id reiciendis ad eligendi. Aperiam corporis nobis et repellendus, impedit minus quae a accusantium voluptates quidem consectetur quos sed assumenda debitis molestias odio ea. Tenetur, quibusdam! Molestiae eaque consequuntur ullam nesciunt voluptatem eveniet quidem impedit aut magnam, quos vitae reprehenderit? Fuga unde ut dolorem laboriosam dignissimos amet! Deserunt veniam quo beatae aut corrupti magnam! Beatae vero quod similique placeat assumenda tempora, ea aperiam quidem illum nobis, commodi, animi sapiente libero aliquam. Dolor hic laboriosam laborum, quo non obcaecati doloremque, natus libero molestiae recusandae eos dignissimos corporis ducimus necessitatibus sed a iste cumque. Officiis, ratione minima? Praesentium atque, doloribus inventore dolorem velit, ipsam voluptatum quae soluta tempora nesciunt magni iusto unde fugit culpa perferendis sunt nostrum explicabo iure odit maiores optio? Impedit itaque voluptatibus doloremque asperiores a recusandae, atque officia libero culpa maxime eius blanditiis nesciunt consectetur sint commodi laudantium voluptates iure aut, in facere ipsam. Consectetur sapiente voluptatem ullam, tempore atque dolorem, aliquid dignissimos, obcaecati minus doloremque explicabo eos voluptatibus cum deleniti. Consequatur nam quidem eos magni labore, repudiandae voluptas corrupti sequi quas totam.</p>
          </div>
          <div className="about_address">
            <p>Հեռ։ +374 98 878787</p>
            <p>ՄոբիՇոփ Արթ ՍՊԸ</p>
            <p>ՀՎՀՀ 01840784</p>
            <p>Արարատյան 148/2</p>
            <p>E-mail: <Link to=''>info@mobishop.am</Link></p>
          </div>
        </div>
        <div className="about_image_box">
          <div className="image_box">
            <div>
              <span>Համեցեք մեր խանութ սրահ</span>
              <p>Սիրով սպասում ենք ձեզ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
