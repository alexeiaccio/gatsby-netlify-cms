import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
     css?:string;
     cx?:string;
 }    
  interface SVGProps<T> extends React.DOMAttributes<T> {
     css?:string;
     cx?:string;
 }    
}
