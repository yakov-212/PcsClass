namespace HW49
{
    internal class HW49
    {
        static void Main(string[] args)
        {
            String[] colors = new String[] { "Red", "Blue", "Green", "Yellow", "Orange", "White"};
            String[] pattern = new String[] { "stripped", "plain", "plad" };
            int amount = colors.Length * pattern.Length;
            Shirt[] closet = new Shirt[amount];

            for (int i = 0; i < amount; i++)
            {
                closet[i] = new Shirt(colors[i / pattern.Length],pattern[i % pattern.Length]);
                Console.Write($"{ i / pattern.Length }, {i % pattern.Length}, ");
                Console.WriteLine(closet[i]);
            }

        }
    }
}
