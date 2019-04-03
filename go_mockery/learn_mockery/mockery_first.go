package learn_mockery

//go:generate mockery -name=Rjy

type Rjy interface {
	Get(a int) int
}
