import CodeWindow from "@/components/lab/CodeWindow";
import Link from "next/link";
import Head from "next/head";
export default function derivative() {
    return (
        <>
            <Head>
                <title>Derivative calculator | Mohamed Sheref</title>
            </Head>
            <CodeWindow packages={["matplotlib"]} code={
                `import matplotlib.pyplot as plt
import numpy as np
import math

# Feel free to change the domain or the step (warning: lower step means longer load times, and may crash the site if you're not careful)
domain = [-2, 2]
h = 0.01

# Change here:
def f(x):
    return math.pow(x, 3) + math.pow(x, 2) + 1


def f_dash(x):
    return (f(x + h) - f(x)) / h

length = int((domain[1]-domain[0])/h)
x_array = np.linspace(domain[0], domain[1], length)
y_array = np.zeros(length)
y_dash_array = np.zeros(length)
# You can enable double derivative too if you'd like by uncommenting their code
# y_double_dash_array = np.zeros(length)




for i, x in enumerate(x_array):
    y_array[i] = f(x)
    y_dash_array[i] = f_dash(x)
    # y_double_dash_array[i] = f_dash(f_dash(x))

plt.cla()
plt.plot(x_array, y_array, color="blue")
plt.plot(x_array, y_dash_array, color="orange")
# plt.plot(x_array, y_double_dash_array, color="red")
plt.show()
`}/>

            <h2>
                Result graph will show here:
            </h2>

            <div id="plot-target"/>
            <Link href={"/blogs/why-do-i-code"}>Link to related blog post</Link>
        </>
    )

}