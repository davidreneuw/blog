const markdown = `
![](https://media.nomadicmatt.com/2024/brisbanestay.jpeg)

Brisbane is the third-largest city in Australia.
Most travelers visit the city on their way to the Gold Coast or as they head up toward Cairns.
They tend not to stay too long as the city doesn’t really have the allure that other parts of Australia does.
  
But Brisbane actually has plenty to see and do and I think people short change it.Home to just over two million people, it’s a very outdoorsy place, with lots of parks and even an urban beach.
There’s a high quality of life and a hip restaurant scene, and the largest koala sanctuary in the world is just outside of town. 
And, since it’s not too spread out, you never really too far from anything. 
To help you plan your trip and figure out where to stay during your visit, here’s my list of the best neighborhoods in Brisbane:

## 1. Fortitude Valley

Fortitude Valley is a vibrant and lively neighborhood known for its bustling nightlife and entertainment scene. It's home to numerous bars, clubs, and live music venues, making it a popular destination for those looking to experience Brisbane's vibrant nightlife. During the day, you can explore the trendy boutiques, art galleries, and cafes that line the streets. Fortitude Valley is also known for its Chinatown precinct, where you can find a wide variety of Asian cuisine.

## 2. South Bank

Located on the southern bank of the Brisbane River, South Bank is a cultural and recreational hub. It's famous for its beautiful parklands, stunning river views, and iconic landmarks such as the Wheel of Brisbane and the Nepal Peace Pagoda. South Bank is home to the Queensland Cultural Centre, which houses the Queensland Museum, Queensland Art Gallery, and the Gallery of Modern Art. You can also enjoy swimming at the Streets Beach, a man-made beach with crystal-clear lagoon waters.

## 3. New Farm

New Farm is a trendy and affluent suburb located just a few kilometers from the city center. It's known for its leafy streets, historic houses, and vibrant cafe culture. In New Farm, you'll find the popular New Farm Park, a spacious riverside park perfect for picnics and outdoor activities. The area is also home to the Brisbane Powerhouse, a contemporary arts center that hosts a variety of performances, exhibitions, and festivals throughout the year.

## 4. West End

West End is a diverse and eclectic neighborhood with a bohemian vibe. It's known for its alternative arts scene, multicultural dining options, and vibrant street markets. In West End, you can explore Boundary Street, the main thoroughfare lined with quirky shops, boutiques, and eateries. The area is also home to the iconic Davies Park Market, where you can find fresh produce, artisanal products, and live music every Saturday.

## 5. Kangaroo Point

Situated on a picturesque peninsula overlooking the Brisbane River, Kangaroo Point offers stunning views of the city skyline and the iconic Story Bridge. It's a popular spot for outdoor activities such as rock climbing, abseiling, and cycling. Kangaroo Point is also home to the Kangaroo Point Cliffs Park, a scenic parkland with barbecue facilities and picnic areas. You can take a leisurely stroll along the riverfront or enjoy a sunset cruise to admire the city lights.

These are just a few of the best neighborhoods in Brisbane that you should consider when planning your visit. Each neighborhood offers its own unique charm and attractions, ensuring that there's something for everyone in this vibrant city.`;

import Markdown from "react-markdown";
export default function Example() {
  return (
    <div>
      <div className="bg-[url('tulips.jpg')] h-48 w-full backdrop-filter backdrop-blur-sm bg-opacity-10"></div>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-1/2">
          <div className="my-8">
            <h1 className="text-5xl">
              Where to Stay in Brisbane: The Best Neighborhoods for Your Visit
            </h1>
            <h2 className="text-2xl italic">by Nomadic Matt</h2>
          </div>
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </div>
  );
}
