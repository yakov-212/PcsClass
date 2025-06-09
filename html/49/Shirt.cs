using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW49
{
    internal class Shirt
    {
        private String color { set; get; }
        private String pattern { set; get; }
        public Shirt(String color, String pattern) { 
            this.color = color;
            this.pattern = pattern;
        }
        public override string ToString()
        {
            return $" {color} {pattern} shirt";
        }
    }
}
