import {Coffee} from "../types/coffee";
import type {JSX} from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type CoffeeProps = {
  coffee: Coffee;
};


export default function CoffeeCardItem( {coffee} : CoffeeProps): JSX.Element {
  return(
    <Card className="mx-auto w-72 overflow-hidden pt-0"> 
      <Image 
        src="/images/Ethiopia_._Shopify_Product_Image_Coffee_bag.jpg"
        alt={coffee.name}
        width={280}
        height={220}
        className="aspect-[4/3] w-full object-cover"
      /> 

      <CardHeader className="space-y-4 p-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-m font-semibold leading-tight">
            {coffee.name}
          </CardTitle>

          <Badge variant="secondary">
            {coffee.roastLevel} Roast
          </Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {coffee.origin}
          </p>

          <p className="text-xs font-semibold">
            SEK {coffee.price}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                coffee.available ? "bg-green-500" : "bg-red-500"
              }`}
            />

            <span>
              {coffee.available ? "In stock" : "Out of stock"}
            </span>
          </div>

          <ul className="flex flex-wrap gap-4">
            {coffee.flavorNotes.map((note, index) => (
              <li
                key={index}
                className="rounded-full bg-muted px-2 py-1 text-xs"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>

      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
      </Card>
    ) 
  
}