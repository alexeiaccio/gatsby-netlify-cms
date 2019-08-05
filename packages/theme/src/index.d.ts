import * as React from './index'

declare module 'react' {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
     css?:string;
     cx?:string;
 }    
}
