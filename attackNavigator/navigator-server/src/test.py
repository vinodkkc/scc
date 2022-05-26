from pyattck import Attck

attack = Attck()

ent = attack.enterprise
print(ent)
tech = ent.techniques
print(tech)

