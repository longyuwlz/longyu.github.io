# 让抽象变得非常简单的 perl 引用功能
## perl 引用是什么
perl 中的【引用】与 c 语言中的【指针】类似。在 perl 中引用是一个【标量变量】，**指向或者说引用其它的对象**，这些对象可以是标量、数组、哈希数组、函数等等。

**实际上一个引用中保存的是它所指向的对象的内存地址。**

对 c/c++ 比较熟悉的朋友，可能对**传值与传指针**、**传值与传引用**这两种方式有着深入的体会。虽然指针与引用其实也可以划归到传值中，但引用与指针让我们拥有了在子函数中直接访问引用对象的能力，这也就意味着我们可以在子函数中对指针、引用所指向的对象进行修改，事实上我们常常会这样做！

上文中已经提到，一个引用中保存的一般是其它对象的【内存地址】，那如果我们要访问到引用对象内部的数据，就需要以这个内存地址为基址来获取内存中存储的值，这样的过程被称为【解除引用】。

进一步的思考是既然我们可以读取内存来获取对象的数据，那么我们是不是也能够通过写入内存来修改内存中的数据呢？事实上在大部分情况中我们确实可以这样做，但对那些【常量数据】，我们也确实不能修改它们。

## perl 引用的好处
根据我的经验 perl 中的引用有如下好处：

**1. 扩充子函数的功能**

使用引用作为子函数的参数能够让子函数拥有**修改外部数据**的能力，这样就不用通过【返回值】来完成了。

**2. 便于实现复杂的数据结构如二维数组、复杂的哈希数组等**
 
**3. 统一函数调用接口，类似多态功能的实现**

## 我为什么要使用引用
我当初使用 perl 中的引用就是为了实现【统一接口】。

我在编写代码生成器的时候需要对同一张表进行不同的处理。这里提到的处理其流程在一个抽象层次中是相同的，细节上最大的区别在于过滤与生成代码的逻辑。

按照基本的思路，我可以指定一个参数给调用过滤函数的父函数，在父函数中通过判断参数来分发不同的过滤函数来筛选并生成新的表，可是当我需要添加新的过滤函数时，我就需要直接修改父函数的函数体，这样的方式能够解决问题，却很不完美。

用 c 语言来实现父函数大概是这个样子：

```c
char* generate_code(const char* string, int type) 
{
    char* output_string = NULL;
	...
	switch (type) {
	case GENERATE_FUNCTION_DECLARATION:
	    output_string = generate_function_declaration(string);
	    break;
	case GENERATE_FUNCTION_DEFINE:
	    output_string = generate_function_define(string);
	    break;
	case GENERATE_FUNCTION_CALL_STATEMENT:
	    output_string = generate_function_call_statement(string);
	    break;
	...
	}
	...
    return outptu_string;
}

...
char* function_declaration = NULL;
char* function_body = NULL;
char* function_call_statement = NULL;

function_declaration = generate_code(string, GENERATE_FUNCTION_DECLARATION);
function_body = generate_code(string, GENERATE_FUNCTION_DEFINE);
function_call_statement = generate_code(string, GENERATE_FUNCTION_STATEMENT);
...
```
如果我要寻找一种更为优雅的解决方案，那么我会使用【函数指针】来完成。我可以以【函数指针】为参数，将具体的过滤函数传递给父函数，这样当我需要使用添加新的过滤函数的时候，我就不需要修改父函数的函数体，仅仅修改传递的【函数指针】的具体值就可以了。使用这种方式的实现代码如下：

```c
typedef char* (*filter_function)(const char* string);
 
char* generate_code(const char* string, filter_function filter) {
	...
	char* output_string = NULL;
	
	if (filter) {
		output_string = (*filter)(string);  
    }

    return output_string;
    
	...
}

...
char* function_declaration = NULL;
char* function_body = NULL;
char* function_call_statement = NULL;

function_declaration = generate_code(string, generate_function_declaration);
function_body = generate_code(string, generate_function_body);
function_call_statement = generate_code(string, generate_function_call_statement);

```

对第二种方式的思考可以进一步的联系到面向对象的方法上面去。对于生成代码这个问题，我们可以抽象出一个完整的处理流程，用 c 代码表示如下：

```c
typedef char* (*filter_function)(const char* string);

char* make_input_string(const char* filename) {
	...
}

char* generate_code(const char* string, filter_function filter)
{
	...
}

int write_string_to_file(const char* string, const char* filename) {
   ...
}
```

上面的三个函数是这个简单的代码生成器中的关键流程，将这些流程抽象出来，并按照顺序调用就能够完成一个完整的流程。下面是一个具体的调用逻辑：


```c
int main_logical_call(char* filename)
{
    int err = -1;
    
	if (filename) {
	    char* input_string = NULL;
	    char* function_declaration = NULL;
        char* function_body = NULL;
        char* function_call_statement = NULL;
	    
	    input_string = make_input_table(filename);
	    
	    function_declaration = generate_code(input_string, generate_function_declaration);
	    function_body = generate_code(input_string, generate_function_define);
        function_call_statement = generate_code(input_string, generate_function_call_statement);
        
	    write_string_to_file((const char*)function_declaration, make_function_declaration_file_name(filename));
	    write_string_to_file((const char*)function_declaration, make_function_define_file_name(filename));
        write_string_to_file((const char*)function_declaration, make_function_call_file_name(filename));
        
        ret = 0;
	}
	
	return ret;
}
```

仔细观察上面的调用逻辑，它都是在串行的调用上面提到过的三个函数，写到这里也许可以停下来了，可是如果进一步思考上面这个函数的话，我觉得这样的一个调用过程也可以进行【抽象】，**通过抽象可以在更高的层次上描述这个问题，扩展问题的作用范围**。相关的 c 语言描述代码如下：

```c
struct string_generator_class;

typedef char* (*make_input_string_t)(struct string_generator_class* this);
typedef char* (*filter_and_generate_string_t)(struct string_generator_class* this);
typedef int (*write_string_to_file_t)(struct string_generator_class* this);

typedef struct vtable {
	int type;
	make_input_string_t make_input_string;
	filter_and_generate_string_t generate_string;
	write_string_to_file_t write_string_to_file;
} vtable_t;

typedef struct string_generator_class {
    const char* in_fname;
    const char* out_fname;
         
    /* virtual method */
    const vtable_t* vt;
} string_generator_class_t;

/* header file ended */

/* source file start */
string_generator_class_t init_string_generator_object(string_generator_class_t* object, 
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　vtable_t* vtable, 
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　const char* input_filename, 
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　const char* out_filename)
{
    ...
	object->in_fname = input_filename;
	object->out_fname = output_filename;
	object->vt = vtable;
	...
}

int string_generator_run(string_generator_class_t* object) {
	...
	object->vt->make_input_string(object);
	object->vt->generate_string(object);
	object->vt->write_string_to_file(object);
	...
}
```

上面的代码实现了一个【超类】，超类的方法通过【虚函数表】来引用，这在一定程度上体现了面向对象语言设计中【单继承】功能的实现内幕。**init_string_generator_object** 函数可以说是父类的构造函数，这里并为了简化问题并没有使用任何动态的数据，因此不必提供析构函数。

**string_generator_run** 函数是对同一问题的不同形式进行抽象的结果，它让我们能够复用完整的一套处理过程，也让我们能够更进一步的认识问题的本质。

有了这个超类我们就可以通过【继承】来实现不同的子类，这样的过程将我们推向了一个个具体的问题，虽然这些问题之间可能并没有太大关联，但是它们的共同之处已经由父类描述了，这样我们就能够复用父类的一套处理流程。

下面是一个子类的实现：


```c
/* an child class example */
typedef char* (*filter_function_t)(const char* string);

typedef struct function_generator_class {
	string_generate_class_t base;
	
	filter_function_t filter;
	
	/* private */
	char* input_string;
	
    /* private */
    char* output_string;
    
} function_generator_class_t;

static char* make_input_string(string_generator_class_t* this) {
	...
}

static char* generate_code(string_generator_class_t* this)
{
	function_generator_class_t* function_generator_object = (function_generator_class_t*)this;
	
	...
	function_generator_object->output_string = function_generator_object->filter(function_generator_object->input_string);

    return function_generator_object->output_string;
}

static int write_string_to_file(string_generator_class_t* this) {
   ...
}

#define FUNCTION_GENERATOR 1

static vtable_t function_generator_vtable = {
	.type = FUNCTION_GENERATOR;
	.make_input_string = make_input_string;
	.generate_string = generate_code;
	.write_string_to_file = write_string_to_file;
};

string_generator_class_t init_an_function_generator(string_generator_class_t* object, 
                                                    const char* input_filename, 
                                                    const char* output_filename,
                                                    filter_function_t filter)
{
	function_generator_class_t* function_generator_object = (function_generator_class_t*)object;
	...
	function_generator_object->input_string = NULL;
	function_generator_object->output_string = NULL;
	function_generator_object->filter = filter;
	
	init_string_generator_object(object, &function_generator_vtable, input_filename, output_filename);

	...
	
	return object;
}
```
**实现了这个子类我们可以创建不同的对象，通过调用子类提供的构造函数 **init_an_function_generator** 我们可以进一步扩展对象的形式，让同一个类创建的对象能够实现各种具体的需求，真正做到复用类。**

不过上面这个类的实现中，其方法的返回值可能值得商榷，不过这并不是这里的重点，也就不再赘述了！


下面是一个具体的使用示例：

```c
/********************************************************************/
/* call logical */
static const char* make_function_declaration_filename(const char* filename)
{
	...
}

static const char* make_function_body_filename(const char* filename)
{
	...
} 

static const char* make_function_call_statement(const char* filename)
{
	...
}

static char* function_declaration_filter(const char* string)
{
	...
}

static char* function_body_filter(const char* string)
{
	...
}

static char* function_call_statement_filter(const char* string)
{
	...
}

int main_logical_call(const char* filename)
{
	function_generator_class_t function_declaration_generator;
	function_generator_class_t function_body_generator;
	function_generator_class_t function_call_statement_generator;
	string_generator_class_t* string_generator = NULL;
	
	string_generator = init_an_function_generator(&function_declaration_generator, 
	                                              filename, 		              
	                                              make_function_declaration_filename(filename), 
	                                              function_declaration_filter);
    string_generator_run(string_generator);
    
    string_generator = init_an_function_generator(&function_body_generator, 
    											  filename, 
    											  make_function_body_filename(filename), 
    											  function_body_filter);

    string_generator_run(string_generator);
    
	string_generator = init_an_function_generator(&function_call_statement_generator,
	   											  filename, 
	   											  make_function_call_statement_filename(filename), 
	   											  function_call_statement_filter);
　　 string_generator_run(string_generator);
    
    return 0;
}
```

如果还要将多个子类的调用接口进行统一，那么可以将不同的子类绑定于一个唯一标识符之上，并将类的所有方法（包括构造函数与析构函数）全部封装到类中，然后将类以唯一标识符为 **key** 注册到某一个格式工厂中，这样就可以通过 **key** 来统一查询工厂方法来统一所有子类的操作过程。

写到这里我想到了 **SICP** 中讲的统一坐标系表示方法的实现，在这里限于篇幅原因就不进一步叙述了。

## perl 中常见的几种引用
**1. 数组引用**

**2. 哈希数组引用**

**3. 函数引用**


代码示例详见——[perl-reference](https://www.perltutorial.org/perl-reference/)

## 使用引用实现代码生成器
下面这个程序是一个简单的【代码生成器】。它会生成函数的【调用语句】与【函数体】。函数调用语句输出到【标准输出】中，函数体会分发到不同的源文件中。

同时注意，同一类型的功能会进行排序并分发到相同的文件中。这里生成函数调用语句与函数体所依赖的输入表是一样的，使用函数引用将接口统一。**这样当需要生成新的代码时，只需要编写一个生成规则的描述函数，通过传递引用的方式将该函数的引用传递到生成输出表的函数中即可，这样就避免了直接修改生成输出表的函数，扩展性更好！**

```pl
#!/usr/bin/perl

use strict;
use utf8;

sub gen_output_buffer {
    my($test_name, $pcc_name, $addr_offset) = @_;
    my($buffer);

    if ($test_name eq "" || $pcc_name eq "" || $addr_offset eq "") {
        print STDERR "invalid parameters of gen_output_buffer\n";
        return "";
    }
    
    $buffer = sprintf("%s%s%s%s%s%s%s%s", "static struct riscv_test_desc ",
                      $test_name,  "_test_desc = {\n", "    &riscv_test_", $pcc_name,
                      "_test_desc,\n    ", $addr_offset, ",\n};\n\n"); 
    
    $buffer .= sprintf("%s%s%s%s%s", "RV32M1_VEGA_TEST_DEFS(",
                       $test_name, "_test_sel, ", $test_name, "_test_desc);\n\n");

    $buffer .= sprintf("%s%s%s%s%s%s%s%s%s%s%s%s", "struct test* riscv_test_register_", $test_name,
                       "_test_sel(\n", "    struct test *p_test_sel,\n",
                       "    int test_id,\n", "    const char *name)\n{\n",
                       "    return riscv_test_register(\n", 
                       "        p_test_sel,\n",
                       "        test_id,\n",
                       "        name,\n        &",
                       $test_name, "_test_sel_ops);\n}\n\n");

    return $buffer;
}

sub dispatch_input {
    my($str, $func_ref, $need_sort) = @_;
    my($buffer);
    
    if ($str eq "") {
        print STDERR "null table in dispatch_input";
        return "";
    }

    my(@out_fields) = split / /, $str;

    if ($need_sort) {
        @out_fields = sort  @out_fields;
    }
    
    foreach (@out_fields) {
        my(@in_fields) = split /:/, $_;
	    $buffer .= &$func_ref(@in_fields);
    }
    
    return $buffer . "\n";
}

sub make_register_statement {
    my($test_name, $pcc_name) = @_;
    my($buffer);
    
    if ($test_name eq "" || $pcc_name eq "") {
        print STDERR "invalid parameter in make_register_statement";
        return "";
    }

    $buffer = sprintf("%s%s%s%s%s%s", "    RISCV_REGISTER_TEST_ONE(", $test_name,
                      "_test_sel, ", "RISCV_TEST_",
                      uc($test_name . "_sel"), ");\n");
    
    $buffer .= sprintf("%s%s%s%s%s%s%s%s%s", "    RISCV_TEST_REGISTER_TEST_TWO_",
                       uc($pcc_name),
                       "_TEST(", $test_name, ", RISCV_TEST_",
                       uc($test_name), ", RISCV_TEST_",
                       uc($test_name), "_TEST);\n");
    
    return $buffer . "\n";
}

sub find_exist_position {
    my($str, $table_ref) = @_;
    my($position);
    
    if ($str eq "") {
        print STDERR "invalid paramenter of function find_exist_position";
        return $position;
    }

    foreach (0 .. @$table_ref) {
        if (index($table_ref->[$_], $str) != -1) {
            $position = $_;
            return $position;
        }
    }
    return -1;
}

sub filter_input {
    my($inttab_ref, $fname_ref) = @_;
    my($index);
    my(@output_table);
    my(@input_table) = @$inttab_ref;
    my $outtab_index;
    
    foreach $index (0 .. $#input_table) {
        my(@fields) = split /:/, $input_table[$index];
        my($str) = substr($fields[0], 0,
                          length($fields[0]) - 1);

        my($exist_position) = find_exist_position($str, \@output_table);
        
        if ($exist_position != -1) {
            $output_table[$exist_position] .= " " .
                $input_table[$index];
        } else {
            $fname_ref->[$outtab_index] = sprintf("%s%s%s",
                                                  "riscv_test_",
                                                  $str, ".c");
            
            $output_table[$outtab_index++] = $input_table[$index];
        }
    }

    return @output_table;
}

sub make_input_table {
    my(@input_table);
    my($index);
    
    while (<>) {
        chomp;
        $input_table[$index++] = $_;
    }

    return @input_table;
}

sub generate_sel {
    my @input_table = &make_input_table();
    my @output_table;
    my @filename_table;

    foreach (0 .. $#input_table) {
        print STDOUT &dispatch_input($input_table[$_],
                                     \&make_register_statement, 0);
    }
    
    @output_table = &filter_input(\@input_table, \@filename_table);

    foreach  (0 .. $#output_table) {
        if (!open OUTPUTFILE, "> $filename_table[$_]") {
            die "open $filename_table[$_] failed\n";
        }
        
        print OUTPUTFILE "#include \"riscv_coommon.h\"\n\n" .
            &dispatch_input($output_table[$_], \&gen_output_buffer, 1);
        
        close OUTPUTFILE;
    }
}

&generate_sel();
```
## 测试用例如下
test0:gp0:0x76
func1:gf0:0x97
test1:gp1:0x78
func2:gp0:0x78

## 执行结果如下
```sg
[longyu@debian-10:18:54:01] perl_language $ perl generate_sel.pl sel_test_data 
    RISCV_REGISTER_TEST_ONE(test0_test_sel, RISCV_TEST_TEST0_SEL);
    RISCV_TEST_REGISTER_TEST_TWO_GP0_TEST(test0, RISCV_TEST_TEST0, RISCV_TEST_TEST0_TEST);


    RISCV_REGISTER_TEST_ONE(func1_test_sel, RISCV_TEST_FUNC1_SEL);
    RISCV_TEST_REGISTER_TEST_TWO_GF0_TEST(func1, RISCV_TEST_FUNC1, RISCV_TEST_FUNC1_TEST);


    RISCV_REGISTER_TEST_ONE(test1_test_sel, RISCV_TEST_TEST1_SEL);
    RISCV_TEST_REGISTER_TEST_TWO_GP1_TEST(test1, RISCV_TEST_TEST1, RISCV_TEST_TEST1_TEST);


    RISCV_REGISTER_TEST_ONE(func2_test_sel, RISCV_TEST_FUNC2_SEL);
    RISCV_TEST_REGISTER_TEST_TWO_GP0_TEST(func2, RISCV_TEST_FUNC2, RISCV_TEST_FUNC2_TEST);


[longyu@debian-10:18:54:58] perl_language $ ls -lh riscv_test_*
-rw-r--r-- 1 longyu longyu 803 8月  21 18:54 riscv_test_func.c
-rw-r--r-- 1 longyu longyu 803 8月  21 18:54 riscv_test_test.c
[longyu@debian-10:18:55:14] perl_language $ 
```
## 总结
**本文以 perl 中的引用为引子，从引用的介绍开始，逐渐聚焦于为什么使用引用的问题，并将这个问题与 c 语言中的函数指针进行联系，进一步思考了面向对象思想的应用，有一定的启发意义！**

